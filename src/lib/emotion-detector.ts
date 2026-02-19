/**
 * Emotion Detection using 5 HuggingFace NLP Models
 * 
 * Models used:
 * 1. J-Hartmann emotion-english-distilroberta-base (6 emotions)
 * 2. Boltuix BERT-emotion (emotion validation)
 * 3. NLP Town multilingual sentiment (1-5 star rating)
 * 4. BharatiyaBytes flan-t5-sarcasm (sarcasm detection)
 * 5. CardiffNLP twitter-roberta-base-sentiment (casual text sentiment)
 */

import { callModelsInParallel, type HFResponse } from './huggingface-client';

// Model identifiers
const MODELS = {
  HARTMANN_EMOTION: 'j-hartmann/emotion-english-distilroberta-base',
  BOLTUIX_EMOTION: 'Boltuix/bert-emotion',
  NLPTOWN_SENTIMENT: 'nlptown/bert-base-multilingual-uncased-sentiment',
  SARCASM: 'helinivan/english-sarcasm-detector',
  CARDIFF_SENTIMENT: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
} as const;

// Emotion categories
export type Emotion = 'anger' | 'disgust' | 'fear' | 'joy' | 'neutral' | 'sadness' | 'surprise';

export type Sentiment = 'positive' | 'negative' | 'neutral';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'crisis';

export interface EmotionResult {
  // Primary emotion detected
  primaryEmotion: Emotion;
  emotionConfidence: number;
  
  // All emotion scores
  emotionScores: Record<Emotion, number>;
  
  // Sentiment analysis
  sentiment: Sentiment;
  sentimentScore: number; // -1 (negative) to +1 (positive)
  
  // Sarcasm detection
  sarcasmDetected: boolean;
  sarcasmConfidence: number;
  
  // Overall urgency level (for routing)
  urgencyLevel: UrgencyLevel;
  
  // Raw model responses for debugging
  rawResponses?: Record<string, HFResponse[]>;
}

/**
 * Analyze text for emotions, sentiment, and sarcasm using 5 NLP models in parallel
 */
export async function detectEmotion(text: string, includeRaw = false): Promise<EmotionResult> {
  // Call all 5 models in parallel
  const results = await callModelsInParallel<HFResponse>([
    { model: MODELS.HARTMANN_EMOTION, inputs: text, key: 'hartmann' },
    { model: MODELS.BOLTUIX_EMOTION, inputs: text, key: 'boltuix' },
    { model: MODELS.NLPTOWN_SENTIMENT, inputs: text, key: 'nlptown' },
    { model: MODELS.SARCASM, inputs: text, key: 'sarcasm' },
    { model: MODELS.CARDIFF_SENTIMENT, inputs: text, key: 'cardiff' },
  ]);

  // Parse Hartmann emotion results (primary emotion model)
  const emotionScores = parseEmotionScores(results.hartmann || []);
  const primaryEmotion = getPrimaryEmotion(emotionScores);
  const emotionConfidence = emotionScores[primaryEmotion] || 0;

  // Parse sentiment from Cardiff and NLPTown
  const sentiment = parseSentiment(results.cardiff, results.nlptown);
  const sentimentScore = calculateSentimentScore(results.cardiff, results.nlptown);

  // Parse sarcasm detection
  const { sarcasmDetected, sarcasmConfidence } = parseSarcasm(results.sarcasm);

  // Determine urgency level
  const urgencyLevel = determineUrgency(emotionScores, sentimentScore, text);

  return {
    primaryEmotion,
    emotionConfidence,
    emotionScores,
    sentiment,
    sentimentScore,
    sarcasmDetected,
    sarcasmConfidence,
    urgencyLevel,
    ...(includeRaw ? { rawResponses: results } : {}),
  };
}

/**
 * Parse emotion scores from Hartmann model response
 */
function parseEmotionScores(response: HFResponse[]): Record<Emotion, number> {
  const scores: Record<Emotion, number> = {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    neutral: 0,
    sadness: 0,
    surprise: 0,
  };

  // Response is typically [[{label, score}, ...]]
  const emotions = Array.isArray(response[0]) ? response[0] : response;
  
  for (const item of emotions) {
    if (item.label && typeof item.score === 'number') {
      const emotion = item.label.toLowerCase() as Emotion;
      if (emotion in scores) {
        scores[emotion] = item.score;
      }
    }
  }

  return scores;
}

/**
 * Get the primary (highest scoring) emotion
 */
function getPrimaryEmotion(scores: Record<Emotion, number>): Emotion {
  let maxEmotion: Emotion = 'neutral';
  let maxScore = 0;

  for (const [emotion, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxEmotion = emotion as Emotion;
    }
  }

  return maxEmotion;
}

/**
 * Parse sentiment from Cardiff and NLPTown models
 */
function parseSentiment(
  cardiff: HFResponse[] | undefined,
  nlptown: HFResponse[] | undefined
): Sentiment {
  // Cardiff model: LABEL_0 (negative), LABEL_1 (neutral), LABEL_2 (positive)
  if (cardiff && cardiff.length > 0) {
    const items = Array.isArray(cardiff[0]) ? cardiff[0] : cardiff;
    const topResult = items.reduce((a, b) => 
      (b.score || 0) > (a.score || 0) ? b : a
    , items[0]);
    
    if (topResult?.label) {
      if (topResult.label === 'positive' || topResult.label === 'LABEL_2') return 'positive';
      if (topResult.label === 'negative' || topResult.label === 'LABEL_0') return 'negative';
    }
  }

  return 'neutral';
}

/**
 * Calculate sentiment score from -1 (negative) to +1 (positive)
 */
function calculateSentimentScore(
  cardiff: HFResponse[] | undefined,
  nlptown: HFResponse[] | undefined
): number {
  let score = 0;
  let count = 0;

  // Cardiff score
  if (cardiff && cardiff.length > 0) {
    const items = Array.isArray(cardiff[0]) ? cardiff[0] : cardiff;
    for (const item of items) {
      if (item.label === 'positive' || item.label === 'LABEL_2') {
        score += (item.score || 0);
        count++;
      } else if (item.label === 'negative' || item.label === 'LABEL_0') {
        score -= (item.score || 0);
        count++;
      }
    }
  }

  // NLPTown score (1-5 stars)
  if (nlptown && nlptown.length > 0) {
    const items = Array.isArray(nlptown[0]) ? nlptown[0] : nlptown;
    for (const item of items) {
      if (item.label) {
        const stars = parseInt(item.label.charAt(0));
        if (!isNaN(stars)) {
          // Convert 1-5 to -1 to +1
          const normalized = ((stars - 1) / 4) * 2 - 1;
          score += normalized * (item.score || 0);
          count++;
        }
      }
    }
  }

  return count > 0 ? score / count : 0;
}

/**
 * Parse sarcasm detection results
 */
function parseSarcasm(response: HFResponse[] | undefined): {
  sarcasmDetected: boolean;
  sarcasmConfidence: number;
} {
  if (!response || response.length === 0) {
    return { sarcasmDetected: false, sarcasmConfidence: 0 };
  }

  const items = Array.isArray(response[0]) ? response[0] : response;
  
  for (const item of items) {
    if (item.label?.toLowerCase().includes('sarcas') || item.label === 'LABEL_1') {
      return {
        sarcasmDetected: (item.score || 0) > 0.5,
        sarcasmConfidence: item.score || 0,
      };
    }
  }

  return { sarcasmDetected: false, sarcasmConfidence: 0 };
}

/**
 * Determine urgency level based on emotions and keywords
 */
function determineUrgency(
  emotions: Record<Emotion, number>,
  sentimentScore: number,
  text: string
): UrgencyLevel {
  const lowercaseText = text.toLowerCase();
  
  // Crisis keywords - immediate intervention needed
  const crisisKeywords = [
    "can't go on", "end it", "no point", "want to die",
    "self-harm", "hurt myself", "suicide", "kill myself",
    "nobody cares", "better off without me", "not worth living"
  ];
  
  if (crisisKeywords.some(kw => lowercaseText.includes(kw))) {
    return 'crisis';
  }

  // High urgency: strong negative emotions
  if (
    (emotions.sadness > 0.7 || emotions.fear > 0.6) &&
    sentimentScore < -0.5
  ) {
    return 'high';
  }

  // Medium urgency: moderate negative emotions
  if (
    (emotions.sadness > 0.4 || emotions.fear > 0.4 || emotions.anger > 0.5) &&
    sentimentScore < -0.2
  ) {
    return 'medium';
  }

  return 'low';
}

/**
 * Quick emotion check using only the primary Hartmann model
 * Faster than full detection, good for initial routing
 */
export async function quickEmotionCheck(text: string): Promise<{
  emotion: Emotion;
  confidence: number;
}> {
  const { callHuggingFaceModel } = await import('./huggingface-client');
  
  const response = await callHuggingFaceModel(MODELS.HARTMANN_EMOTION, text);
  const scores = parseEmotionScores(response);
  const emotion = getPrimaryEmotion(scores);
  
  return {
    emotion,
    confidence: scores[emotion] || 0,
  };
}
