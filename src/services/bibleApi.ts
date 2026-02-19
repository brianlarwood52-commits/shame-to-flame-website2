interface BibleVerse {
  id: string;
  orgId: string;
  bookId: string;
  chapterNumber: number;
  verseNumber: number;
  content: string;
  reference: string;
}

interface BiblePassage {
  id: string;
  orgId: string;
  content: string;
  reference: string;
  verseCount: number;
  copyright: string;
}

interface BibleBook {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
}

class BibleApiService {
  private apiKey = '69c0975e7dee3b884f01a69cc52901db';
  private baseUrl = 'https://api.scripture.api.bible/v1';
  private bibleId = 'de4e12af7f28f599-02'; // English Standard Version

  constructor() {
    // API key is hardcoded for this application
  }

  private async makeRequest(endpoint: string): Promise<any> {
    try {
      console.log('Making Bible API request to:', `${this.baseUrl}${endpoint}`);
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'api-key': this.apiKey,
          'Accept': 'application/json',
        },
      });

      console.log('Bible API response status:', response.status);

      if (!response.ok) {
        let errorMessage = `Bible API request failed: ${response.status} ${response.statusText}`;
        
        // Try to get more specific error information
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage += ` - ${errorData.error}`;
          }
          if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
          }
        } catch (jsonError) {
          // If we can't parse the error response, just use the status
        }

        // Provide more specific error messages based on status codes
        if (response.status === 401) {
          errorMessage = 'Invalid or missing Bible API key. Please check your API key from scripture.api.bible and try again.';
        } else if (response.status === 403) {
          errorMessage = 'Access forbidden. Your Bible API key may not have permission to access this resource.';
        } else if (response.status === 404) {
          errorMessage = 'Bible verse or passage not found. Please check the reference format.';
        } else if (response.status === 429) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (response.status >= 500) {
          errorMessage = 'Bible API server error. Please try again later.';
        }

        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to Bible API. Please check your internet connection.');
      }
      throw error;
    }
  }

  async getPassage(reference: string): Promise<BiblePassage> {
    try {
      const formattedRef = this.formatReferenceForApi(reference);
      // Request HTML content with verse numbers for proper formatting
      const data = await this.makeRequest(`/bibles/${this.bibleId}/passages/${formattedRef}?content-type=html&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`);
      return data.data;
    } catch (error) {
      console.error('Error fetching Bible passage:', error);
      throw error;
    }
  }

  async getVerse(reference: string): Promise<BibleVerse> {
    try {
      const formattedRef = this.formatReferenceForApi(reference);
      // Request HTML content with verse numbers for proper formatting
      const data = await this.makeRequest(`/bibles/${this.bibleId}/verses/${formattedRef}?content-type=html&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`);
      return data.data;
    } catch (error) {
      console.error('Error fetching Bible verse:', error);
      throw error;
    }
  }

  async searchVerses(query: string, limit: number = 10): Promise<BibleVerse[]> {
    try {
      const data = await this.makeRequest(`/bibles/${this.bibleId}/search?query=${encodeURIComponent(query)}&limit=${limit}`);
      return data.data.verses || [];
    } catch (error) {
      console.error('Error searching Bible verses:', error);
      throw error;
    }
  }

  async getBooks(): Promise<BibleBook[]> {
    try {
      const data = await this.makeRequest(`/bibles/${this.bibleId}/books`);
      return data.data;
    } catch (error) {
      console.error('Error fetching Bible books:', error);
      throw error;
    }
  }

  // Format reference for scripture.api.bible API
  private formatReferenceForApi(reference: string): string {
    // Handle shorthand verse ranges (e.g., 'PSA.55.12-14' -> 'PSA.55.12-PSA.55.14')
    const shorthandRangeMatch = reference.match(/^([A-Z0-9]+)\.(\d+)\.(\d+)-(\d+)$/);
    if (shorthandRangeMatch) {
      const [, book, chapter, startVerse, endVerse] = shorthandRangeMatch;
      return `${book}.${chapter}.${startVerse}-${book}.${chapter}.${endVerse}`;
    }

    // If already contains dots, return as-is (let API handle shorthand ranges)
    if (reference.includes('.')) {
      return reference;
    }

    // Parse "Book Chapter:Verse" format
    const match = reference.match(/^(\d?\s?\w+)\s+(\d+):(\d+)$/);
    if (match) {
      const [, book, chapter, verse] = match;
      const bookCode = this.getBookCode(book.trim());
      return `${bookCode}.${chapter}.${verse}`;
    }

    // Parse "Book Chapter" format
    const chapterMatch = reference.match(/^(\d?\s?\w+)\s+(\d+)$/);
    if (chapterMatch) {
      const [, book, chapter] = chapterMatch;
      const bookCode = this.getBookCode(book.trim());
      return `${bookCode}.${chapter}`;
    }

    return reference; // Return as-is if we can't parse it
  }

  // Map common book names to scripture.api.bible codes
  private getBookCode(bookName: string): string {
    const bookCodes: { [key: string]: string } = {
      'Genesis': 'GEN',
      'Exodus': 'EXO',
      'Leviticus': 'LEV',
      'Numbers': 'NUM',
      'Deuteronomy': 'DEU',
      'Joshua': 'JOS',
      'Judges': 'JDG',
      'Ruth': 'RUT',
      '1 Samuel': '1SA',
      '2 Samuel': '2SA',
      '1 Kings': '1KI',
      '2 Kings': '2KI',
      '1 Chronicles': '1CH',
      '2 Chronicles': '2CH',
      'Ezra': 'EZR',
      'Nehemiah': 'NEH',
      'Esther': 'EST',
      'Job': 'JOB',
      'Psalms': 'PSA',
      'Psalm': 'PSA',
      'Proverbs': 'PRO',
      'Ecclesiastes': 'ECC',
      'Song of Solomon': 'SNG',
      'Isaiah': 'ISA',
      'Jeremiah': 'JER',
      'Lamentations': 'LAM',
      'Ezekiel': 'EZK',
      'Daniel': 'DAN',
      'Hosea': 'HOS',
      'Joel': 'JOL',
      'Amos': 'AMO',
      'Obadiah': 'OBA',
      'Jonah': 'JON',
      'Micah': 'MIC',
      'Nahum': 'NAM',
      'Habakkuk': 'HAB',
      'Zephaniah': 'ZEP',
      'Haggai': 'HAG',
      'Zechariah': 'ZEC',
      'Malachi': 'MAL',
      'Matthew': 'MAT',
      'Mark': 'MRK',
      'Luke': 'LUK',
      'John': 'JHN',
      'Acts': 'ACT',
      'Romans': 'ROM',
      '1 Corinthians': '1CO',
      '2 Corinthians': '2CO',
      'Galatians': 'GAL',
      'Ephesians': 'EPH',
      'Philippians': 'PHP',
      'Colossians': 'COL',
      '1 Thessalonians': '1TH',
      '2 Thessalonians': '2TH',
      '1 Timothy': '1TI',
      '2 Timothy': '2TI',
      'Titus': 'TIT',
      'Philemon': 'PHM',
      'Hebrews': 'HEB',
      'James': 'JAS',
      '1 Peter': '1PE',
      '2 Peter': '2PE',
      '1 John': '1JN',
      '2 John': '2JN',
      '3 John': '3JN',
      'Jude': 'JUD',
      'Revelation': 'REV'
    };

    return bookCodes[bookName] || bookName.toUpperCase();
  }

  // Helper method to format verse references for API calls
  formatReference(book: string, chapter: number, verse?: number): string {
    const bookCode = this.getBookCode(book);
    if (verse) {
      return `${bookCode}.${chapter}.${verse}`;
    }
    return `${bookCode}.${chapter}`;
  }

  // Convert common reference formats to API format
  parseReference(reference: string): string {
    return this.formatReferenceForApi(reference);
  }

  // Process HTML content to format verses properly with numbers and line breaks
  formatVerseContent(htmlContent: string): string {
    if (!htmlContent) return '';

    // Clean up the HTML content first
    let cleanContent = htmlContent
      .replace(/<\/?p[^>]*>/g, '') // Remove paragraph tags
      .replace(/<\/?div[^>]*>/g, '') // Remove div tags
      .replace(/<br\s*\/?>/g, ' ') // Replace line breaks with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Extract verses with their numbers using regex patterns
    const verses: Array<{number: string, text: string}> = [];
    
    // Pattern 1: Look for verse spans with data-number attribute
    const verseSpanPattern = /<span[^>]*class="[^"]*v[^"]*"[^>]*data-number="(\d+)"[^>]*>([^<]*)<\/span>([^<]*?)(?=<span[^>]*class="[^"]*v[^"]*"|$)/g;
    let match;
    
    while ((match = verseSpanPattern.exec(cleanContent)) !== null) {
      const verseNumber = match[1];
      const verseText = (match[2] + match[3]).trim();
      if (verseText) {
        verses.push({ number: verseNumber, text: verseText });
      }
    }

    // If no verses found with the first pattern, try alternative patterns
    if (verses.length === 0) {
      // Pattern 2: Look for any span with data-number
      const altPattern = /<span[^>]*data-number="(\d+)"[^>]*>([^<]*)<\/span>([^<]*?)(?=<span[^>]*data-number="\d+"|$)/g;
      
      while ((match = altPattern.exec(cleanContent)) !== null) {
        const verseNumber = match[1];
        const verseText = (match[2] + match[3]).trim();
        if (verseText) {
          verses.push({ number: verseNumber, text: verseText });
        }
      }
    }

    // If still no verses found, try to extract from plain text with numbers
    if (verses.length === 0) {
      // Remove all HTML tags and look for number patterns
      const plainText = cleanContent.replace(/<[^>]*>/g, '').trim();
      
      // Split by potential verse numbers (standalone numbers at start of segments)
      const segments = plainText.split(/(?=\b\d+\s+)/);
      
      segments.forEach(segment => {
        const trimmed = segment.trim();
        if (trimmed) {
          const numberMatch = trimmed.match(/^(\d+)\s+(.+)/);
          if (numberMatch) {
            verses.push({ 
              number: numberMatch[1], 
              text: numberMatch[2].trim() 
            });
          } else if (verses.length === 0) {
            // If no number found and this is the first segment, assume it's verse 1
            verses.push({ number: '1', text: trimmed });
          }
        }
      });
    }

    // Format the verses with proper spacing and line breaks
    if (verses.length > 0) {
      return verses.map(verse => {
        return `${verse.number} ${verse.text}`;
      }).join('\n\n');
    }

    // Fallback: return cleaned content as-is
    return cleanContent.replace(/<[^>]*>/g, '').trim();
  }
}

export default BibleApiService;
export type { BibleVerse, BiblePassage, BibleBook };