/**
 * Privacy-by-design localStorage wrapper for Shame to Flame.
 * All keys are prefixed with 'stf_' to avoid conflicts.
 * Every operation is wrapped in try/catch for SSR and private-browsing safety.
 */

const PREFIX = 'stf_';

function prefixKey(key: string): string {
  return `${PREFIX}${key}`;
}

/**
 * Retrieve a value from localStorage, deserialised as T.
 * Returns null when the key doesn't exist or storage is unavailable.
 */
export function get<T>(key: string): T | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(prefixKey(key));
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Persist a value to localStorage (JSON-serialised).
 */
export function set<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(prefixKey(key), JSON.stringify(value));
  } catch {
    // Silently fail – quota exceeded or private mode
  }
}

/**
 * Remove a single key from localStorage.
 */
export function remove(key: string): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(prefixKey(key));
  } catch {
    // Silently fail
  }
}

/**
 * Clear ALL Shame-to-Flame keys (leaves other apps' data untouched).
 */
export function clear(): void {
  try {
    if (typeof window === 'undefined') return;
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // Silently fail
  }
}
