import { BibleBook } from '@/types/bible';

export const BIBLE_BOOKS: BibleBook[] = [
  { id: 1, name: 'Genesis', abbreviation: 'Gen', testament: 'OT', bookOrder: 1, chapterCount: 50, category: 'Law' },
  { id: 2, name: 'Exodus', abbreviation: 'Exod', testament: 'OT', bookOrder: 2, chapterCount: 40, category: 'Law' },
  { id: 3, name: 'Leviticus', abbreviation: 'Lev', testament: 'OT', bookOrder: 3, chapterCount: 27, category: 'Law' },
  { id: 4, name: 'Numbers', abbreviation: 'Num', testament: 'OT', bookOrder: 4, chapterCount: 36, category: 'Law' },
  { id: 5, name: 'Deuteronomy', abbreviation: 'Deut', testament: 'OT', bookOrder: 5, chapterCount: 34, category: 'Law' },
  { id: 6, name: 'Joshua', abbreviation: 'Josh', testament: 'OT', bookOrder: 6, chapterCount: 24, category: 'History' },
  { id: 7, name: 'Judges', abbreviation: 'Judg', testament: 'OT', bookOrder: 7, chapterCount: 21, category: 'History' },
  { id: 8, name: 'Ruth', abbreviation: 'Ruth', testament: 'OT', bookOrder: 8, chapterCount: 4, category: 'History' },
  { id: 9, name: '1 Samuel', abbreviation: '1Sam', testament: 'OT', bookOrder: 9, chapterCount: 31, category: 'History' },
  { id: 10, name: '2 Samuel', abbreviation: '2Sam', testament: 'OT', bookOrder: 10, chapterCount: 24, category: 'History' },
  { id: 11, name: '1 Kings', abbreviation: '1Kgs', testament: 'OT', bookOrder: 11, chapterCount: 22, category: 'History' },
  { id: 12, name: '2 Kings', abbreviation: '2Kgs', testament: 'OT', bookOrder: 12, chapterCount: 25, category: 'History' },
  { id: 13, name: '1 Chronicles', abbreviation: '1Chr', testament: 'OT', bookOrder: 13, chapterCount: 29, category: 'History' },
  { id: 14, name: '2 Chronicles', abbreviation: '2Chr', testament: 'OT', bookOrder: 14, chapterCount: 36, category: 'History' },
  { id: 15, name: 'Ezra', abbreviation: 'Ezra', testament: 'OT', bookOrder: 15, chapterCount: 10, category: 'History' },
  { id: 16, name: 'Nehemiah', abbreviation: 'Neh', testament: 'OT', bookOrder: 16, chapterCount: 13, category: 'History' },
  { id: 17, name: 'Esther', abbreviation: 'Esth', testament: 'OT', bookOrder: 17, chapterCount: 10, category: 'History' },
  { id: 18, name: 'Job', abbreviation: 'Job', testament: 'OT', bookOrder: 18, chapterCount: 42, category: 'Wisdom' },
  { id: 19, name: 'Psalms', abbreviation: 'Ps', testament: 'OT', bookOrder: 19, chapterCount: 150, category: 'Wisdom' },
  { id: 20, name: 'Proverbs', abbreviation: 'Prov', testament: 'OT', bookOrder: 20, chapterCount: 31, category: 'Wisdom' },
  { id: 21, name: 'Ecclesiastes', abbreviation: 'Eccl', testament: 'OT', bookOrder: 21, chapterCount: 12, category: 'Wisdom' },
  { id: 22, name: 'Song of Solomon', abbreviation: 'Song', testament: 'OT', bookOrder: 22, chapterCount: 8, category: 'Wisdom' },
  { id: 23, name: 'Isaiah', abbreviation: 'Isa', testament: 'OT', bookOrder: 23, chapterCount: 66, category: 'Prophecy' },
  { id: 24, name: 'Jeremiah', abbreviation: 'Jer', testament: 'OT', bookOrder: 24, chapterCount: 52, category: 'Prophecy' },
  { id: 25, name: 'Lamentations', abbreviation: 'Lam', testament: 'OT', bookOrder: 25, chapterCount: 5, category: 'Prophecy' },
  { id: 26, name: 'Ezekiel', abbreviation: 'Ezek', testament: 'OT', bookOrder: 26, chapterCount: 48, category: 'Prophecy' },
  { id: 27, name: 'Daniel', abbreviation: 'Dan', testament: 'OT', bookOrder: 27, chapterCount: 12, category: 'Prophecy' },
  { id: 28, name: 'Hosea', abbreviation: 'Hos', testament: 'OT', bookOrder: 28, chapterCount: 14, category: 'Prophecy' },
  { id: 29, name: 'Joel', abbreviation: 'Joel', testament: 'OT', bookOrder: 29, chapterCount: 3, category: 'Prophecy' },
  { id: 30, name: 'Amos', abbreviation: 'Amos', testament: 'OT', bookOrder: 30, chapterCount: 9, category: 'Prophecy' },
  { id: 31, name: 'Obadiah', abbreviation: 'Obad', testament: 'OT', bookOrder: 31, chapterCount: 1, category: 'Prophecy' },
  { id: 32, name: 'Jonah', abbreviation: 'Jonah', testament: 'OT', bookOrder: 32, chapterCount: 4, category: 'Prophecy' },
  { id: 33, name: 'Micah', abbreviation: 'Mic', testament: 'OT', bookOrder: 33, chapterCount: 7, category: 'Prophecy' },
  { id: 34, name: 'Nahum', abbreviation: 'Nah', testament: 'OT', bookOrder: 34, chapterCount: 3, category: 'Prophecy' },
  { id: 35, name: 'Habakkuk', abbreviation: 'Hab', testament: 'OT', bookOrder: 35, chapterCount: 3, category: 'Prophecy' },
  { id: 36, name: 'Zephaniah', abbreviation: 'Zeph', testament: 'OT', bookOrder: 36, chapterCount: 3, category: 'Prophecy' },
  { id: 37, name: 'Haggai', abbreviation: 'Hag', testament: 'OT', bookOrder: 37, chapterCount: 2, category: 'Prophecy' },
  { id: 38, name: 'Zechariah', abbreviation: 'Zech', testament: 'OT', bookOrder: 38, chapterCount: 14, category: 'Prophecy' },
  { id: 39, name: 'Malachi', abbreviation: 'Mal', testament: 'OT', bookOrder: 39, chapterCount: 4, category: 'Prophecy' },
  { id: 40, name: 'Matthew', abbreviation: 'Matt', testament: 'NT', bookOrder: 40, chapterCount: 28, category: 'Gospel' },
  { id: 41, name: 'Mark', abbreviation: 'Mark', testament: 'NT', bookOrder: 41, chapterCount: 16, category: 'Gospel' },
  { id: 42, name: 'Luke', abbreviation: 'Luke', testament: 'NT', bookOrder: 42, chapterCount: 24, category: 'Gospel' },
  { id: 43, name: 'John', abbreviation: 'John', testament: 'NT', bookOrder: 43, chapterCount: 21, category: 'Gospel' },
  { id: 44, name: 'Acts', abbreviation: 'Acts', testament: 'NT', bookOrder: 44, chapterCount: 28, category: 'History' },
  { id: 45, name: 'Romans', abbreviation: 'Rom', testament: 'NT', bookOrder: 45, chapterCount: 16, category: 'Epistle' },
  { id: 46, name: '1 Corinthians', abbreviation: '1Cor', testament: 'NT', bookOrder: 46, chapterCount: 16, category: 'Epistle' },
  { id: 47, name: '2 Corinthians', abbreviation: '2Cor', testament: 'NT', bookOrder: 47, chapterCount: 13, category: 'Epistle' },
  { id: 48, name: 'Galatians', abbreviation: 'Gal', testament: 'NT', bookOrder: 48, chapterCount: 6, category: 'Epistle' },
  { id: 49, name: 'Ephesians', abbreviation: 'Eph', testament: 'NT', bookOrder: 49, chapterCount: 6, category: 'Epistle' },
  { id: 50, name: 'Philippians', abbreviation: 'Phil', testament: 'NT', bookOrder: 50, chapterCount: 4, category: 'Epistle' },
  { id: 51, name: 'Colossians', abbreviation: 'Col', testament: 'NT', bookOrder: 51, chapterCount: 4, category: 'Epistle' },
  { id: 52, name: '1 Thessalonians', abbreviation: '1Thess', testament: 'NT', bookOrder: 52, chapterCount: 5, category: 'Epistle' },
  { id: 53, name: '2 Thessalonians', abbreviation: '2Thess', testament: 'NT', bookOrder: 53, chapterCount: 3, category: 'Epistle' },
  { id: 54, name: '1 Timothy', abbreviation: '1Tim', testament: 'NT', bookOrder: 54, chapterCount: 6, category: 'Epistle' },
  { id: 55, name: '2 Timothy', abbreviation: '2Tim', testament: 'NT', bookOrder: 55, chapterCount: 4, category: 'Epistle' },
  { id: 56, name: 'Titus', abbreviation: 'Titus', testament: 'NT', bookOrder: 56, chapterCount: 3, category: 'Epistle' },
  { id: 57, name: 'Philemon', abbreviation: 'Phlm', testament: 'NT', bookOrder: 57, chapterCount: 1, category: 'Epistle' },
  { id: 58, name: 'Hebrews', abbreviation: 'Heb', testament: 'NT', bookOrder: 58, chapterCount: 13, category: 'Epistle' },
  { id: 59, name: 'James', abbreviation: 'Jas', testament: 'NT', bookOrder: 59, chapterCount: 5, category: 'Epistle' },
  { id: 60, name: '1 Peter', abbreviation: '1Pet', testament: 'NT', bookOrder: 60, chapterCount: 5, category: 'Epistle' },
  { id: 61, name: '2 Peter', abbreviation: '2Pet', testament: 'NT', bookOrder: 61, chapterCount: 3, category: 'Epistle' },
  { id: 62, name: '1 John', abbreviation: '1John', testament: 'NT', bookOrder: 62, chapterCount: 5, category: 'Epistle' },
  { id: 63, name: '2 John', abbreviation: '2John', testament: 'NT', bookOrder: 63, chapterCount: 1, category: 'Epistle' },
  { id: 64, name: '3 John', abbreviation: '3John', testament: 'NT', bookOrder: 64, chapterCount: 1, category: 'Epistle' },
  { id: 65, name: 'Jude', abbreviation: 'Jude', testament: 'NT', bookOrder: 65, chapterCount: 1, category: 'Epistle' },
  { id: 66, name: 'Revelation', abbreviation: 'Rev', testament: 'NT', bookOrder: 66, chapterCount: 22, category: 'Apocalyptic' },
];

export const POETRY_BOOKS = [18, 19, 20, 21, 22, 25];

export const RED_LETTER_BOOKS = [40, 41, 42, 43];

export function getBookById(id: number): BibleBook | undefined {
  return BIBLE_BOOKS.find(book => book.id === id);
}

export function getBookByName(name: string): BibleBook | undefined {
  const normalized = name.toLowerCase().trim();
  return BIBLE_BOOKS.find(book =>
    book.name.toLowerCase() === normalized ||
    book.abbreviation.toLowerCase() === normalized
  );
}

export function getBookByAbbreviation(abbr: string): BibleBook | undefined {
  const normalized = abbr.toLowerCase().trim();
  return BIBLE_BOOKS.find(book => book.abbreviation.toLowerCase() === normalized);
}

export function parseVerseKey(verseKey: string): { bookId: number; chapter: number; verse: number } | null {
  const parts = verseKey.split('.');
  if (parts.length !== 3) return null;

  const book = getBookByAbbreviation(parts[0]);
  if (!book) return null;

  return {
    bookId: book.id,
    chapter: parseInt(parts[1]),
    verse: parseInt(parts[2])
  };
}

export function formatVerseReference(bookId: number, chapter: number, verse?: number): string {
  const book = getBookById(bookId);
  if (!book) return '';

  if (verse !== undefined) {
    return `${book.name} ${chapter}:${verse}`;
  }
  return `${book.name} ${chapter}`;
}
