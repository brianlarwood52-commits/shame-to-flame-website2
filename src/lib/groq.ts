/**
 * Groq API Client
 * Uses OpenAI gpt-oss-120b for complex paraphrasing
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqChatRequest {
  model: string;
  messages: GroqMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
  stop?: string[];
}

export interface GroqChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: GroqMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GroqError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

// ============================================================================
// Configuration
// ============================================================================

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const GROQ_MODELS = {
  // Primary model - OpenAI GPT-OSS 120B
  GPT_OSS_120B: 'openai/gpt-oss-120b',
  GPT_OSS_20B: 'openai/gpt-oss-20b',
  // Fallback models
  LLAMA_3_3_70B: 'llama-3.3-70b-versatile',
  LLAMA_3_1_8B: 'llama-3.1-8b-instant',
  MIXTRAL_8X7B: 'mixtral-8x7b-32768',
} as const;

export type GroqModel = typeof GROQ_MODELS[keyof typeof GROQ_MODELS];

// ============================================================================
// Groq Client Class
// ============================================================================

export class GroqClient {
  private apiKey: string;
  private defaultModel: GroqModel;

  constructor(apiKey?: string, defaultModel: GroqModel = GROQ_MODELS.GPT_OSS_120B) {
    const key = apiKey || process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    if (!key) {
      throw new Error('Groq API key is required. Set GROQ_API_KEY environment variable.');
    }
    
    this.apiKey = key;
    this.defaultModel = defaultModel;
  }

  /**
   * Send a chat completion request to Groq
   */
  async chat(
    messages: GroqMessage[],
    options?: {
      model?: GroqModel;
      temperature?: number;
      maxTokens?: number;
      topP?: number;
      stop?: string[];
    }
  ): Promise<string> {
    const request: GroqChatRequest = {
      model: options?.model || this.defaultModel,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1024,
      top_p: options?.topP ?? 1,
      stream: false,
      stop: options?.stop,
    };

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json() as GroqError;
        throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json() as GroqChatResponse;
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated from Groq');
      }

      return data.choices[0].message.content;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to call Groq API: ${String(error)}`);
    }
  }

  /**
   * Simple completion with just a prompt
   */
  async complete(
    prompt: string,
    systemPrompt?: string,
    options?: {
      model?: GroqModel;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const messages: GroqMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: prompt });
    
    return this.chat(messages, options);
  }

  /**
   * Paraphrase text with emotional context awareness
   */
  async paraphraseWithContext(
    text: string,
    emotionalContext: {
      primary_emotion: string;
      sentiment: string;
      urgency_level: string;
    },
    tier: string
  ): Promise<string> {
    const systemPrompt = `You are a compassionate ministry assistant for "Shame to Flame," a Christian ministry helping people overcome shame.

Your task is to paraphrase responses to make them more personal and emotionally appropriate.

Guidelines:
- Match the emotional tone to the user's state (${emotionalContext.primary_emotion}, ${emotionalContext.sentiment})
- Urgency level: ${emotionalContext.urgency_level}
- Tier: ${tier}
- Keep the theological accuracy
- Be warm and pastoral, not clinical
- Use "you" language to connect personally
- If urgency is high/critical, acknowledge the pain directly
- Keep paraphrases concise but heartfelt

Respond ONLY with the paraphrased text, no explanations.`;

    return this.complete(text, systemPrompt, {
      temperature: 0.7,
      maxTokens: 512,
    });
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let groqClientInstance: GroqClient | null = null;

export function getGroqClient(apiKey?: string): GroqClient {
  if (!groqClientInstance) {
    groqClientInstance = new GroqClient(apiKey);
  }
  return groqClientInstance;
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Quick paraphrase using Groq
 */
export async function groqParaphrase(
  text: string,
  emotionalContext: {
    primary_emotion: string;
    sentiment: string;
    urgency_level: string;
  },
  tier: string,
  apiKey?: string
): Promise<string> {
  const client = new GroqClient(apiKey);
  return client.paraphraseWithContext(text, emotionalContext, tier);
}

/**
 * Quick completion using Groq
 */
export async function groqComplete(
  prompt: string,
  systemPrompt?: string,
  apiKey?: string
): Promise<string> {
  const client = new GroqClient(apiKey);
  return client.complete(prompt, systemPrompt);
}
