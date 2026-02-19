export interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  language: string;
  available: boolean;
}

export interface BibleBook {
  id: string;
  name: string;
  abbreviation: string;
  testament: 'Old' | 'New';
  chapters: number;
}

export const bibleVersions: BibleVersion[] = [
  {
    id: 'de4e12af7f28f599-02',
    name: 'English Standard Version',
    abbreviation: 'ESV',
    description: 'A literal translation that balances accuracy with readability',
    language: 'English',
    available: true
  },
  {
    id: '06125adad2d5898a-01',
    name: 'King James Version',
    abbreviation: 'KJV',
    description: 'The classic English translation from 1611',
    language: 'English',
    available: true
  },
  {
    id: '9879dbb7cfe39e4d-01',
    name: 'New International Version',
    abbreviation: 'NIV',
    description: 'A balance between word-for-word and thought-for-thought translation',
    language: 'English',
    available: true
  },
  {
    id: '7142879509583d59-01',
    name: 'New Living Translation',
    abbreviation: 'NLT',
    description: 'A thought-for-thought translation in contemporary English',
    language: 'English',
    available: true
  },
  {
    id: '65eec8e0b60e656b-01',
    name: 'New American Standard Bible',
    abbreviation: 'NASB',
    description: 'A literal translation emphasizing accuracy to the original texts',
    language: 'English',
    available: true
  }
];

export const bibleBooks: BibleBook[] = [
  // Old Testament
  { id: 'GEN', name: 'Genesis', abbreviation: 'Gen', testament: 'Old', chapters: 50 },
  { id: 'EXO', name: 'Exodus', abbreviation: 'Exo', testament: 'Old', chapters: 40 },
  { id: 'LEV', name: 'Leviticus', abbreviation: 'Lev', testament: 'Old', chapters: 27 },
  { id: 'NUM', name: 'Numbers', abbreviation: 'Num', testament: 'Old', chapters: 36 },
  { id: 'DEU', name: 'Deuteronomy', abbreviation: 'Deu', testament: 'Old', chapters: 34 },
  { id: 'JOS', name: 'Joshua', abbreviation: 'Jos', testament: 'Old', chapters: 24 },
  { id: 'JDG', name: 'Judges', abbreviation: 'Jdg', testament: 'Old', chapters: 21 },
  { id: 'RUT', name: 'Ruth', abbreviation: 'Rut', testament: 'Old', chapters: 4 },
  { id: '1SA', name: '1 Samuel', abbreviation: '1Sa', testament: 'Old', chapters: 31 },
  { id: '2SA', name: '2 Samuel', abbreviation: '2Sa', testament: 'Old', chapters: 24 },
  { id: '1KI', name: '1 Kings', abbreviation: '1Ki', testament: 'Old', chapters: 22 },
  { id: '2KI', name: '2 Kings', abbreviation: '2Ki', testament: 'Old', chapters: 25 },
  { id: '1CH', name: '1 Chronicles', abbreviation: '1Ch', testament: 'Old', chapters: 29 },
  { id: '2CH', name: '2 Chronicles', abbreviation: '2Ch', testament: 'Old', chapters: 36 },
  { id: 'EZR', name: 'Ezra', abbreviation: 'Ezr', testament: 'Old', chapters: 10 },
  { id: 'NEH', name: 'Nehemiah', abbreviation: 'Neh', testament: 'Old', chapters: 13 },
  { id: 'EST', name: 'Esther', abbreviation: 'Est', testament: 'Old', chapters: 10 },
  { id: 'JOB', name: 'Job', abbreviation: 'Job', testament: 'Old', chapters: 42 },
  { id: 'PSA', name: 'Psalms', abbreviation: 'Psa', testament: 'Old', chapters: 150 },
  { id: 'PRO', name: 'Proverbs', abbreviation: 'Pro', testament: 'Old', chapters: 31 },
  { id: 'ECC', name: 'Ecclesiastes', abbreviation: 'Ecc', testament: 'Old', chapters: 12 },
  { id: 'SNG', name: 'Song of Solomon', abbreviation: 'SoS', testament: 'Old', chapters: 8 },
  { id: 'ISA', name: 'Isaiah', abbreviation: 'Isa', testament: 'Old', chapters: 66 },
  { id: 'JER', name: 'Jeremiah', abbreviation: 'Jer', testament: 'Old', chapters: 52 },
  { id: 'LAM', name: 'Lamentations', abbreviation: 'Lam', testament: 'Old', chapters: 5 },
  { id: 'EZK', name: 'Ezekiel', abbreviation: 'Ezk', testament: 'Old', chapters: 48 },
  { id: 'DAN', name: 'Daniel', abbreviation: 'Dan', testament: 'Old', chapters: 12 },
  { id: 'HOS', name: 'Hosea', abbreviation: 'Hos', testament: 'Old', chapters: 14 },
  { id: 'JOL', name: 'Joel', abbreviation: 'Joe', testament: 'Old', chapters: 3 },
  { id: 'AMO', name: 'Amos', abbreviation: 'Amo', testament: 'Old', chapters: 9 },
  { id: 'OBA', name: 'Obadiah', abbreviation: 'Oba', testament: 'Old', chapters: 1 },
  { id: 'JON', name: 'Jonah', abbreviation: 'Jon', testament: 'Old', chapters: 4 },
  { id: 'MIC', name: 'Micah', abbreviation: 'Mic', testament: 'Old', chapters: 7 },
  { id: 'NAM', name: 'Nahum', abbreviation: 'Nah', testament: 'Old', chapters: 3 },
  { id: 'HAB', name: 'Habakkuk', abbreviation: 'Hab', testament: 'Old', chapters: 3 },
  { id: 'ZEP', name: 'Zephaniah', abbreviation: 'Zep', testament: 'Old', chapters: 3 },
  { id: 'HAG', name: 'Haggai', abbreviation: 'Hag', testament: 'Old', chapters: 2 },
  { id: 'ZEC', name: 'Zechariah', abbreviation: 'Zec', testament: 'Old', chapters: 14 },
  { id: 'MAL', name: 'Malachi', abbreviation: 'Mal', testament: 'Old', chapters: 4 },
  
  // New Testament
  { id: 'MAT', name: 'Matthew', abbreviation: 'Mat', testament: 'New', chapters: 28 },
  { id: 'MRK', name: 'Mark', abbreviation: 'Mar', testament: 'New', chapters: 16 },
  { id: 'LUK', name: 'Luke', abbreviation: 'Luk', testament: 'New', chapters: 24 },
  { id: 'JHN', name: 'John', abbreviation: 'Joh', testament: 'New', chapters: 21 },
  { id: 'ACT', name: 'Acts', abbreviation: 'Act', testament: 'New', chapters: 28 },
  { id: 'ROM', name: 'Romans', abbreviation: 'Rom', testament: 'New', chapters: 16 },
  { id: '1CO', name: '1 Corinthians', abbreviation: '1Co', testament: 'New', chapters: 16 },
  { id: '2CO', name: '2 Corinthians', abbreviation: '2Co', testament: 'New', chapters: 13 },
  { id: 'GAL', name: 'Galatians', abbreviation: 'Gal', testament: 'New', chapters: 6 },
  { id: 'EPH', name: 'Ephesians', abbreviation: 'Eph', testament: 'New', chapters: 6 },
  { id: 'PHP', name: 'Philippians', abbreviation: 'Phi', testament: 'New', chapters: 4 },
  { id: 'COL', name: 'Colossians', abbreviation: 'Col', testament: 'New', chapters: 4 },
  { id: '1TH', name: '1 Thessalonians', abbreviation: '1Th', testament: 'New', chapters: 5 },
  { id: '2TH', name: '2 Thessalonians', abbreviation: '2Th', testament: 'New', chapters: 3 },
  { id: '1TI', name: '1 Timothy', abbreviation: '1Ti', testament: 'New', chapters: 6 },
  { id: '2TI', name: '2 Timothy', abbreviation: '2Ti', testament: 'New', chapters: 4 },
  { id: 'TIT', name: 'Titus', abbreviation: 'Tit', testament: 'New', chapters: 3 },
  { id: 'PHM', name: 'Philemon', abbreviation: 'Phm', testament: 'New', chapters: 1 },
  { id: 'HEB', name: 'Hebrews', abbreviation: 'Heb', testament: 'New', chapters: 13 },
  { id: 'JAS', name: 'James', abbreviation: 'Jam', testament: 'New', chapters: 5 },
  { id: '1PE', name: '1 Peter', abbreviation: '1Pe', testament: 'New', chapters: 5 },
  { id: '2PE', name: '2 Peter', abbreviation: '2Pe', testament: 'New', chapters: 3 },
  { id: '1JN', name: '1 John', abbreviation: '1Jn', testament: 'New', chapters: 5 },
  { id: '2JN', name: '2 John', abbreviation: '2Jn', testament: 'New', chapters: 1 },
  { id: '3JN', name: '3 John', abbreviation: '3Jn', testament: 'New', chapters: 1 },
  { id: 'JUD', name: 'Jude', abbreviation: 'Jud', testament: 'New', chapters: 1 },
  { id: 'REV', name: 'Revelation', abbreviation: 'Rev', testament: 'New', chapters: 22 }
];

export const getBookById = (id: string): BibleBook | undefined => {
  return bibleBooks.find(book => book.id === id);
};

export const getVersionById = (id: string): BibleVersion | undefined => {
  return bibleVersions.find(version => version.id === id);
};

export const getOldTestamentBooks = (): BibleBook[] => {
  return bibleBooks.filter(book => book.testament === 'Old');
};

export const getNewTestamentBooks = (): BibleBook[] => {
  return bibleBooks.filter(book => book.testament === 'New');
};