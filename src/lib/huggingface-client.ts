/**
 * Hugging Face Inference API Client
 * Base client for calling HuggingFace models with retry logic and caching
 */

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models';

interface HFResponse {
  label?: string;
  score?: number;
  generated_text?: string;
  [key: string]: unknown;
}

interface CacheEntry {
  result: HFResponse[];
  timestamp: number;
}

// Simple in-memory cache
const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY || process.env.HUGGING_FACE_API_KEY;
  if (!key) {
    throw new Error('HUGGING_FACE_API_KEY is not configured');
  }
  return key;
}

function getCacheKey(model: string, inputs: string): string {
  return `${model}:${inputs}`;
}

/**
 * Call a HuggingFace model with retry logic
 */
export async function callHuggingFaceModel(
  model: string,
  inputs: string,
  options: {
    useCache?: boolean;
    maxRetries?: number;
    retryDelay?: number;
  } = {}
): Promise<HFResponse[]> {
  const { useCache = true, maxRetries = 3, retryDelay = 1000 } = options;
  
  // Check cache first
  if (useCache) {
    const cacheKey = getCacheKey(model, inputs);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.result;
    }
  }

  const apiKey = getApiKey();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(`${HUGGING_FACE_API_URL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs }),
      });

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          const waitTime = retryDelay * Math.pow(2, attempt);
          console.log(`Rate limited, waiting ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        
        // Handle model loading
        if (response.status === 503) {
          const data = await response.json();
          if (data.error?.includes('loading')) {
            console.log(`Model ${model} is loading, waiting...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            continue;
          }
        }

        throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const resultArray = Array.isArray(result) ? result : [result];

      // Cache the result
      if (useCache) {
        const cacheKey = getCacheKey(model, inputs);
        cache.set(cacheKey, { result: resultArray, timestamp: Date.now() });
      }

      return resultArray;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Attempt ${attempt + 1} failed for ${model}:`, lastError.message);
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError || new Error(`Failed to call ${model} after ${maxRetries} attempts`);
}

/**
 * Call multiple HuggingFace models in parallel
 */
export async function callModelsInParallel<T>(
  calls: Array<{ model: string; inputs: string; key: string }>
): Promise<Record<string, T[]>> {
  const results = await Promise.allSettled(
    calls.map(async ({ model, inputs, key }) => {
      const result = await callHuggingFaceModel(model, inputs);
      return { key, result };
    })
  );

  const output: Record<string, T[]> = {};
  
  for (const result of results) {
    if (result.status === 'fulfilled') {
      output[result.value.key] = result.value.result as T[];
    }
  }

  return output;
}

/**
 * Clear the cache
 */
export function clearCache(): void {
  cache.clear();
}

export type { HFResponse };
