/**
 * Bible Service for Shame to Flame
 * Provides verse lookup, chapter retrieval, and search functionality
 * across multiple Bible versions using local JSON data
 */

export type BibleVersion = 'kjv' | 'nkjv' | 'esv' | 'nasb' | 'nlt';

export interface BibleVersionInfo {
  key: BibleVersion;
  name: string;
  abbreviation: string;
  description: string;
}

export interface VerseResult {
  success: boolean;
  text?: string;
  book: string;
  chapter: number;
  verse: number;
  version: BibleVersion;
  versionName: string;
  reference: string;
  error?: string;
}

export interface ChapterResult {
  success: boolean;
  book: string;
  chapter: number;
  version: BibleVersion;
  versionName: string;
  verses: { verse: number; text: string }[];
  verseCount: number;
  reference: string;
  error?: string;
}

export interface SearchResult {
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  snippet: string;
}

export interface SearchResponse {
  success: boolean;
  query: string;
  version: BibleVersion;
  versionName: string;
  resultCount: number;
  results: SearchResult[];
  error?: string;
}

// Bible version metadata
const BIBLE_VERSIONS: Record<BibleVersion, BibleVersionInfo> = {
  kjv: {
    key: 'kjv',
    name: 'King James Version',
    abbreviation: 'KJV',
    description: 'The classic 1611 translation',
  },
  nkjv: {
    key: 'nkjv',
    name: 'New King James Version',
    abbreviation: 'NKJV',
    description: 'Modern update of the KJV',
  },
  esv: {
    key: 'esv',
    name: 'English Standard Version',
    abbreviation: 'ESV',
    description: 'Essentially literal translation',
  },
  nasb: {
    key: 'nasb',
    name: 'New American Standard Bible',
    abbreviation: 'NASB',
    description: 'Highly literal translation',
  },
  nlt: {
    key: 'nlt',
    name: 'New Living Translation',
    abbreviation: 'NLT',
    description: 'Dynamic equivalence translation',
  },
};

// Book name mappings for normalization
const BOOK_ALIASES: Record<string, string> = {
  // Old Testament
  'gen': 'Genesis', 'genesis': 'Genesis',
  'exo': 'Exodus', 'exodus': 'Exodus', 'ex': 'Exodus',
  'lev': 'Leviticus', 'leviticus': 'Leviticus',
  'num': 'Numbers', 'numbers': 'Numbers',
  'deu': 'Deuteronomy', 'deuteronomy': 'Deuteronomy', 'deut': 'Deuteronomy',
  'jos': 'Joshua', 'joshua': 'Joshua', 'josh': 'Joshua',
  'jdg': 'Judges', 'judges': 'Judges', 'judg': 'Judges',
  'rut': 'Ruth', 'ruth': 'Ruth',
  '1sa': '1 Samuel', '1samuel': '1 Samuel', '1 samuel': '1 Samuel', '1 sam': '1 Samuel',
  '2sa': '2 Samuel', '2samuel': '2 Samuel', '2 samuel': '2 Samuel', '2 sam': '2 Samuel',
  '1ki': '1 Kings', '1kings': '1 Kings', '1 kings': '1 Kings',
  '2ki': '2 Kings', '2kings': '2 Kings', '2 kings': '2 Kings',
  '1ch': '1 Chronicles', '1chronicles': '1 Chronicles', '1 chronicles': '1 Chronicles', '1 chron': '1 Chronicles',
  '2ch': '2 Chronicles', '2chronicles': '2 Chronicles', '2 chronicles': '2 Chronicles', '2 chron': '2 Chronicles',
  'ezr': 'Ezra', 'ezra': 'Ezra',
  'neh': 'Nehemiah', 'nehemiah': 'Nehemiah',
  'est': 'Esther', 'esther': 'Esther',
  'job': 'Job',
  'psa': 'Psalms', 'psalms': 'Psalms', 'psalm': 'Psalms', 'ps': 'Psalms',
  'pro': 'Proverbs', 'proverbs': 'Proverbs', 'prov': 'Proverbs',
  'ecc': 'Ecclesiastes', 'ecclesiastes': 'Ecclesiastes', 'eccl': 'Ecclesiastes',
  'sng': 'Song of Solomon', 'song of solomon': 'Song of Solomon', 'song': 'Song of Solomon', 'sos': 'Song of Solomon', 'canticles': 'Song of Solomon',
  'isa': 'Isaiah', 'isaiah': 'Isaiah',
  'jer': 'Jeremiah', 'jeremiah': 'Jeremiah',
  'lam': 'Lamentations', 'lamentations': 'Lamentations',
  'ezk': 'Ezekiel', 'ezekiel': 'Ezekiel', 'eze': 'Ezekiel',
  'dan': 'Daniel', 'daniel': 'Daniel',
  'hos': 'Hosea', 'hosea': 'Hosea',
  'jol': 'Joel', 'joel': 'Joel',
  'amo': 'Amos', 'amos': 'Amos',
  'oba': 'Obadiah', 'obadiah': 'Obadiah', 'obad': 'Obadiah',
  'jon': 'Jonah', 'jonah': 'Jonah',
  'mic': 'Micah', 'micah': 'Micah',
  'nam': 'Nahum', 'nahum': 'Nahum',
  'hab': 'Habakkuk', 'habakkuk': 'Habakkuk',
  'zep': 'Zephaniah', 'zephaniah': 'Zephaniah', 'zeph': 'Zephaniah',
  'hag': 'Haggai', 'haggai': 'Haggai',
  'zec': 'Zechariah', 'zechariah': 'Zechariah', 'zech': 'Zechariah',
  'mal': 'Malachi', 'malachi': 'Malachi',
  // New Testament
  'mat': 'Matthew', 'matthew': 'Matthew', 'matt': 'Matthew', 'mt': 'Matthew',
  'mrk': 'Mark', 'mark': 'Mark', 'mk': 'Mark',
  'luk': 'Luke', 'luke': 'Luke', 'lk': 'Luke',
  'jhn': 'John', 'john': 'John', 'jn': 'John',
  'act': 'Acts', 'acts': 'Acts',
  'rom': 'Romans', 'romans': 'Romans',
  '1co': '1 Corinthians', '1corinthians': '1 Corinthians', '1 corinthians': '1 Corinthians', '1 cor': '1 Corinthians',
  '2co': '2 Corinthians', '2corinthians': '2 Corinthians', '2 corinthians': '2 Corinthians', '2 cor': '2 Corinthians',
  'gal': 'Galatians', 'galatians': 'Galatians',
  'eph': 'Ephesians', 'ephesians': 'Ephesians',
  'php': 'Philippians', 'philippians': 'Philippians', 'phil': 'Philippians',
  'col': 'Colossians', 'colossians': 'Colossians',
  '1th': '1 Thessalonians', '1thessalonians': '1 Thessalonians', '1 thessalonians': '1 Thessalonians', '1 thess': '1 Thessalonians',
  '2th': '2 Thessalonians', '2thessalonians': '2 Thessalonians', '2 thessalonians': '2 Thessalonians', '2 thess': '2 Thessalonians',
  '1ti': '1 Timothy', '1timothy': '1 Timothy', '1 timothy': '1 Timothy', '1 tim': '1 Timothy',
  '2ti': '2 Timothy', '2timothy': '2 Timothy', '2 timothy': '2 Timothy', '2 tim': '2 Timothy',
  'tit': 'Titus', 'titus': 'Titus',
  'phm': 'Philemon', 'philemon': 'Philemon', 'phlm': 'Philemon',
  'heb': 'Hebrews', 'hebrews': 'Hebrews',
  'jas': 'James', 'james': 'James',
  '1pe': '1 Peter', '1peter': '1 Peter', '1 peter': '1 Peter', '1 pet': '1 Peter',
  '2pe': '2 Peter', '2peter': '2 Peter', '2 peter': '2 Peter', '2 pet': '2 Peter',
  '1jn': '1 John', '1john': '1 John', '1 john': '1 John',
  '2jn': '2 John', '2john': '2 John', '2 john': '2 John',
  '3jn': '3 John', '3john': '3 John', '3 john': '3 John',
  'jud': 'Jude', 'jude': 'Jude',
  'rev': 'Revelation', 'revelation': 'Revelation', 'revelations': 'Revelation',
};

// Cache for loaded Bible data
type BibleData = Record<string, Record<string, Record<string, string>>>;
const bibleCache: Partial<Record<BibleVersion, BibleData>> = {};

/**
 * Normalize book name to match the JSON keys
 */
function normalizeBookName(book: string): string | null {
  const normalized = book.toLowerCase().trim();
  
  // Check direct alias match
  if (BOOK_ALIASES[normalized]) {
    return BOOK_ALIASES[normalized];
  }
  
  // Check if it's already a proper book name
  const properNames = Object.values(BOOK_ALIASES);
  const found = properNames.find(
    name => name.toLowerCase() === normalized
  );
  
  return found || null;
}

/**
 * Load Bible data for a specific version
 * Returns cached data if available
 */
async function loadBibleData(version: BibleVersion): Promise<BibleData | null> {
  // Check cache first
  if (bibleCache[version]) {
    return bibleCache[version]!;
  }

  try {
    // Dynamic import for the JSON files
    const response = await fetch(`/data/bibles/${version}.json`);
    if (!response.ok) {
      console.error(`Failed to load ${version} Bible data: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    bibleCache[version] = data;
    return data;
  } catch (error) {
    console.error(`Error loading ${version} Bible data:`, error);
    return null;
  }
}

/**
 * Get a specific verse from the Bible
 */
export async function getVerse(
  book: string,
  chapter: number,
  verse: number,
  version: BibleVersion = 'kjv'
): Promise<VerseResult> {
  const versionInfo = BIBLE_VERSIONS[version];
  const normalizedBook = normalizeBookName(book);
  
  if (!normalizedBook) {
    return {
      success: false,
      book,
      chapter,
      verse,
      version,
      versionName: versionInfo.name,
      reference: `${book} ${chapter}:${verse}`,
      error: `Book "${book}" not found`,
    };
  }

  const bibleData = await loadBibleData(version);
  if (!bibleData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      verse,
      version,
      versionName: versionInfo.name,
      reference: `${normalizedBook} ${chapter}:${verse}`,
      error: `Failed to load ${versionInfo.name} data`,
    };
  }

  const bookData = bibleData[normalizedBook];
  if (!bookData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      verse,
      version,
      versionName: versionInfo.name,
      reference: `${normalizedBook} ${chapter}:${verse}`,
      error: `Book "${normalizedBook}" not found in ${versionInfo.abbreviation}`,
    };
  }

  const chapterData = bookData[String(chapter)];
  if (!chapterData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      verse,
      version,
      versionName: versionInfo.name,
      reference: `${normalizedBook} ${chapter}:${verse}`,
      error: `Chapter ${chapter} not found in ${normalizedBook}`,
    };
  }

  const verseText = chapterData[String(verse)];
  if (!verseText) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      verse,
      version,
      versionName: versionInfo.name,
      reference: `${normalizedBook} ${chapter}:${verse}`,
      error: `Verse ${verse} not found in ${normalizedBook} ${chapter}`,
    };
  }

  return {
    success: true,
    text: verseText,
    book: normalizedBook,
    chapter,
    verse,
    version,
    versionName: versionInfo.name,
    reference: `${normalizedBook} ${chapter}:${verse}`,
  };
}

/**
 * Get an entire chapter from the Bible
 */
export async function getChapter(
  book: string,
  chapter: number,
  version: BibleVersion = 'kjv'
): Promise<ChapterResult> {
  const versionInfo = BIBLE_VERSIONS[version];
  const normalizedBook = normalizeBookName(book);
  
  if (!normalizedBook) {
    return {
      success: false,
      book,
      chapter,
      version,
      versionName: versionInfo.name,
      verses: [],
      verseCount: 0,
      reference: `${book} ${chapter}`,
      error: `Book "${book}" not found`,
    };
  }

  const bibleData = await loadBibleData(version);
  if (!bibleData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      version,
      versionName: versionInfo.name,
      verses: [],
      verseCount: 0,
      reference: `${normalizedBook} ${chapter}`,
      error: `Failed to load ${versionInfo.name} data`,
    };
  }

  const bookData = bibleData[normalizedBook];
  if (!bookData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      version,
      versionName: versionInfo.name,
      verses: [],
      verseCount: 0,
      reference: `${normalizedBook} ${chapter}`,
      error: `Book "${normalizedBook}" not found in ${versionInfo.abbreviation}`,
    };
  }

  const chapterData = bookData[String(chapter)];
  if (!chapterData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      version,
      versionName: versionInfo.name,
      verses: [],
      verseCount: 0,
      reference: `${normalizedBook} ${chapter}`,
      error: `Chapter ${chapter} not found in ${normalizedBook}`,
    };
  }

  // Convert chapter data to sorted verse array
  const verses = Object.entries(chapterData)
    .map(([verseNum, text]) => ({
      verse: parseInt(verseNum, 10),
      text,
    }))
    .sort((a, b) => a.verse - b.verse);

  return {
    success: true,
    book: normalizedBook,
    chapter,
    version,
    versionName: versionInfo.name,
    verses,
    verseCount: verses.length,
    reference: `${normalizedBook} ${chapter}`,
  };
}

/**
 * Search the Bible for a text query
 */
export async function searchBible(
  query: string,
  version: BibleVersion = 'kjv',
  options: {
    limit?: number;
    book?: string;
  } = {}
): Promise<SearchResponse> {
  const { limit = 50, book } = options;
  const versionInfo = BIBLE_VERSIONS[version];
  
  const bibleData = await loadBibleData(version);
  if (!bibleData) {
    return {
      success: false,
      query,
      version,
      versionName: versionInfo.name,
      resultCount: 0,
      results: [],
      error: `Failed to load ${versionInfo.name} data`,
    };
  }

  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  const normalizedBook = book ? normalizeBookName(book) : null;

  // Search through all books
  for (const [bookName, bookData] of Object.entries(bibleData)) {
    // Skip if we're filtering by book and this isn't it
    if (normalizedBook && bookName !== normalizedBook) {
      continue;
    }

    for (const [chapterNum, chapterData] of Object.entries(bookData)) {
      for (const [verseNum, verseText] of Object.entries(chapterData)) {
        if (results.length >= limit) break;
        
        if (verseText.toLowerCase().includes(queryLower)) {
          // Create a snippet with the match highlighted
          const index = verseText.toLowerCase().indexOf(queryLower);
          const start = Math.max(0, index - 40);
          const end = Math.min(verseText.length, index + query.length + 40);
          let snippet = verseText.substring(start, end);
          if (start > 0) snippet = '...' + snippet;
          if (end < verseText.length) snippet = snippet + '...';

          results.push({
            reference: `${bookName} ${chapterNum}:${verseNum}`,
            book: bookName,
            chapter: parseInt(chapterNum, 10),
            verse: parseInt(verseNum, 10),
            text: verseText,
            snippet,
          });
        }
      }
      if (results.length >= limit) break;
    }
    if (results.length >= limit) break;
  }

  return {
    success: true,
    query,
    version,
    versionName: versionInfo.name,
    resultCount: results.length,
    results,
  };
}

/**
 * Get verse range (e.g., John 3:16-18)
 */
export async function getVerseRange(
  book: string,
  chapter: number,
  startVerse: number,
  endVerse: number,
  version: BibleVersion = 'kjv'
): Promise<{
  success: boolean;
  book: string;
  chapter: number;
  verses: { verse: number; text: string }[];
  reference: string;
  version: BibleVersion;
  versionName: string;
  error?: string;
}> {
  const versionInfo = BIBLE_VERSIONS[version];
  const normalizedBook = normalizeBookName(book);
  
  if (!normalizedBook) {
    return {
      success: false,
      book,
      chapter,
      verses: [],
      reference: `${book} ${chapter}:${startVerse}-${endVerse}`,
      version,
      versionName: versionInfo.name,
      error: `Book "${book}" not found`,
    };
  }

  const bibleData = await loadBibleData(version);
  if (!bibleData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      verses: [],
      reference: `${normalizedBook} ${chapter}:${startVerse}-${endVerse}`,
      version,
      versionName: versionInfo.name,
      error: `Failed to load ${versionInfo.name} data`,
    };
  }

  const bookData = bibleData[normalizedBook];
  const chapterData = bookData?.[String(chapter)];
  
  if (!chapterData) {
    return {
      success: false,
      book: normalizedBook,
      chapter,
      verses: [],
      reference: `${normalizedBook} ${chapter}:${startVerse}-${endVerse}`,
      version,
      versionName: versionInfo.name,
      error: `Chapter ${chapter} not found in ${normalizedBook}`,
    };
  }

  const verses: { verse: number; text: string }[] = [];
  for (let v = startVerse; v <= endVerse; v++) {
    const text = chapterData[String(v)];
    if (text) {
      verses.push({ verse: v, text });
    }
  }

  return {
    success: true,
    book: normalizedBook,
    chapter,
    verses,
    reference: `${normalizedBook} ${chapter}:${startVerse}-${endVerse}`,
    version,
    versionName: versionInfo.name,
  };
}

/**
 * Get all available Bible versions
 */
export function getAvailableVersions(): BibleVersionInfo[] {
  return Object.values(BIBLE_VERSIONS);
}

/**
 * Parse a verse reference string like "John 3:16" or "1 Cor 13:4-7"
 */
export function parseReference(reference: string): {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
} | null {
  // Handle formats like "John 3:16", "1 Corinthians 13:4-7", "Psalm 23"
  const match = reference.match(
    /^(\d?\s?[A-Za-z]+(?:\s[A-Za-z]+)?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/
  );
  
  if (!match) return null;
  
  const [, book, chapter, verse, endVerse] = match;
  
  return {
    book: book.trim(),
    chapter: parseInt(chapter, 10),
    verse: verse ? parseInt(verse, 10) : undefined,
    endVerse: endVerse ? parseInt(endVerse, 10) : undefined,
  };
}

/**
 * Format a verse for display with reference
 */
export function formatVerseDisplay(result: VerseResult): string {
  if (!result.success || !result.text) {
    return result.error || 'Verse not found';
  }
  return `"${result.text}" — ${result.reference} (${BIBLE_VERSIONS[result.version].abbreviation})`;
}

// Export the Bible versions constant for external use
export { BIBLE_VERSIONS };
