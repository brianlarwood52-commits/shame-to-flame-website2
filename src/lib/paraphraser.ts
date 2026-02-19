/**
 * Paraphraser - ELIZA-style response generation
 * 
 * Uses NLP paraphrasing for simple transformations,
 * falls back to Groq LLM for complex or emotional responses.
 * 
 * The goal is to rephrase user answers into follow-up questions
 * that encourage deeper reflection.
 */

import { callHuggingFaceModel } from './huggingface-client';
import { GroqClient, GROQ_MODELS } from './groq';

// NLP Paraphrasing model
const PARAPHRASE_MODEL = 'Vamsi/T5_Paraphrase_Paws';

// Confidence threshold - below this, use Groq
const CONFIDENCE_THRESHOLD = 0.7;

export interface ParaphraseResult {
  text: string;
  source: 'nlp' | 'groq' | 'pattern';
  confidence: number;
}

/**
 * Classic ELIZA-style patterns for reflective questions
 * These are fast, cheap, and predictable
 */
const ELIZA_PATTERNS: Array<{
  pattern: RegExp;
  responses: string[];
}> = [
  {
    pattern: /i feel (.+)/i,
    responses: [
      "Tell me more about feeling {1}.",
      "What makes you feel {1}?",
      "How long have you been feeling {1}?",
    ],
  },
  {
    pattern: /i am (.+)/i,
    responses: [
      "Why do you say you are {1}?",
      "How does being {1} affect you?",
      "When did you start feeling {1}?",
    ],
  },
  {
    pattern: /i think (.+)/i,
    responses: [
      "What leads you to think {1}?",
      "Do you often think {1}?",
      "How certain are you that {1}?",
    ],
  },
  {
    pattern: /i can'?t (.+)/i,
    responses: [
      "What would happen if you could {1}?",
      "Have you ever been able to {1}?",
      "What's stopping you from {1}?",
    ],
  },
  {
    pattern: /i want (.+)/i,
    responses: [
      "What would it mean to you to {1}?",
      "Why do you want {1}?",
      "What's preventing you from having {1}?",
    ],
  },
  {
    pattern: /i need (.+)/i,
    responses: [
      "Why do you need {1}?",
      "What would having {1} change for you?",
      "How would your life be different with {1}?",
    ],
  },
  {
    pattern: /i don'?t know (.+)/i,
    responses: [
      "What would help you understand {1}?",
      "If you had to guess about {1}, what would you say?",
      "Is not knowing {1} troubling you?",
    ],
  },
  {
    pattern: /because (.+)/i,
    responses: [
      "Is {1} the only reason?",
      "What else might explain {1}?",
      "How does {1} make you feel?",
    ],
  },
  {
    pattern: /my (.+) (is|are|was|were) (.+)/i,
    responses: [
      "Tell me more about your {1}.",
      "How does your {1} being {3} affect you?",
      "What do you wish was different about your {1}?",
    ],
  },
  {
    pattern: /(.+) makes me (.+)/i,
    responses: [
      "Why does {1} make you {2}?",
      "What about {1} makes you {2}?",
      "Has {1} always made you feel {2}?",
    ],
  },
];

/**
 * Try ELIZA-style pattern matching first (fast, free, predictable)
 */
function tryPatternMatch(text: string): string | null {
  for (const { pattern, responses } of ELIZA_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      // Pick a random response
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      // Replace placeholders with captured groups
      return response.replace(/\{(\d+)\}/g, (_, n) => match[parseInt(n)] || '');
    }
  }
  return null;
}

/**
 * Use NLP model for paraphrasing
 */
async function nlpParaphrase(text: string): Promise<{ text: string; confidence: number } | null> {
  try {
    const prompt = `paraphrase: ${text} into a reflective question`;
    const response = await callHuggingFaceModel(PARAPHRASE_MODEL, prompt, {
      useCache: true,
      maxRetries: 2,
    });

    if (response && response.length > 0) {
      const result = response[0];
      const generatedText = result.generated_text || String(result);
      
      // Simple confidence heuristic: longer responses with question marks are better
      const hasQuestionMark = generatedText.includes('?');
      const reasonableLength = generatedText.length > 10 && generatedText.length < 200;
      const confidence = (hasQuestionMark ? 0.5 : 0) + (reasonableLength ? 0.5 : 0);

      return {
        text: generatedText,
        confidence,
      };
    }
  } catch (error) {
    console.error('NLP paraphrase failed:', error);
  }
  
  return null;
}

/**
 * Use Groq LLM for complex paraphrasing
 */
async function groqParaphrase(
  text: string,
  emotionalContext?: string
): Promise<string> {
  const groq = new GroqClient();
  
  const systemPrompt = `You are a compassionate spiritual counselor using the ELIZA conversational technique.
Your role is to rephrase what someone shares into a thoughtful follow-up question.
The question should:
- Encourage deeper reflection
- Be warm and non-judgmental
- Help the person explore their feelings
- Be concise (one sentence)
${emotionalContext ? `The person seems to be feeling: ${emotionalContext}` : ''}

Respond ONLY with the follow-up question, nothing else.`;

  const response = await groq.chat([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Rephrase this into a reflective question: "${text}"` },
  ], {
    maxTokens: 100,
    temperature: 0.7,
  });

  return response;
}

/**
 * Generate a follow-up question from user's response
 * Uses hybrid approach: Pattern → NLP → Groq
 */
export async function generateFollowUp(
  userResponse: string,
  options: {
    emotionalContext?: string;
    forceGroq?: boolean;
    includeSource?: boolean;
  } = {}
): Promise<ParaphraseResult> {
  const { emotionalContext, forceGroq = false, includeSource = false } = options;

  // Step 1: Try pattern matching (fastest, free)
  if (!forceGroq) {
    const patternResult = tryPatternMatch(userResponse);
    if (patternResult) {
      return {
        text: patternResult,
        source: 'pattern',
        confidence: 0.8, // Patterns are reliable
      };
    }
  }

  // Step 2: Try NLP paraphrasing
  if (!forceGroq) {
    const nlpResult = await nlpParaphrase(userResponse);
    if (nlpResult && nlpResult.confidence >= CONFIDENCE_THRESHOLD) {
      return {
        text: nlpResult.text,
        source: 'nlp',
        confidence: nlpResult.confidence,
      };
    }
  }

  // Step 3: Fall back to Groq LLM
  try {
    const groqResult = await groqParaphrase(userResponse, emotionalContext);
    return {
      text: groqResult,
      source: 'groq',
      confidence: 0.9, // LLM is usually good
    };
  } catch (error) {
    console.error('Groq paraphrase failed:', error);
    
    // Ultimate fallback
    return {
      text: "Can you tell me more about that?",
      source: 'pattern',
      confidence: 0.5,
    };
  }
}

/**
 * Batch generate follow-ups for multiple responses
 */
export async function generateFollowUps(
  responses: string[],
  emotionalContext?: string
): Promise<ParaphraseResult[]> {
  return Promise.all(
    responses.map(r => generateFollowUp(r, { emotionalContext }))
  );
}
