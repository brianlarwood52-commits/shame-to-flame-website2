export interface BibleBook {
  id: number;
  name: string;
  abbreviation: string;
  testament: 'OT' | 'NT';
  bookOrder: number;
  chapterCount: number;
  category: 'Law' | 'History' | 'Wisdom' | 'Prophecy' | 'Gospel' | 'Epistle' | 'Apocalyptic';
}

export interface BibleVerse {
  id: string;
  bookId: number;
  chapter: number;
  verse: number;
  text: string;
  verseKey: string;
  isPoetry: boolean;
  isRedLetter: boolean;
  words: string[];
}

export interface CrossReference {
  id: string;
  fromVerseKey: string;
  toVerseKey: string;
  referenceType: 'parallel' | 'quote' | 'allusion' | 'thematic' | 'prophetic';
  strength: 1 | 2 | 3 | 4 | 5;
}

export interface UserHighlight {
  id: string;
  userId: string;
  verseKey: string;
  color: string;
  colorLabel?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
}

export interface UserNote {
  id: string;
  userId: string;
  verseKey?: string;
  chapterReference?: string;
  noteType: 'verse' | 'chapter' | 'journal';
  title?: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
}

export interface UserBookmark {
  id: string;
  userId: string;
  verseKey: string;
  label: string;
  color: string;
  position: number;
  createdAt: string;
}

export interface ReadingHistoryEntry {
  id: string;
  userId: string;
  verseKey: string;
  chapterReference: string;
  visitedAt: string;
}

export interface StudyCollection {
  id: string;
  userId: string;
  collectionName: string;
  description?: string;
  verseKeys: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingPlan {
  id: string;
  name: string;
  description?: string;
  durationDays: number;
  planType: 'chronological' | 'canonical' | 'thematic' | 'custom';
  dailyReadings: DailyReading[];
  isActive: boolean;
  createdAt: string;
}

export interface DailyReading {
  day: number;
  readings: string[];
  title?: string;
}

export interface UserReadingProgress {
  id: string;
  userId: string;
  planId: string;
  currentDay: number;
  completedDays: number[];
  startedAt: string;
  lastReadAt: string;
  completedAt?: string;
}

export interface UserPreferences {
  userId: string;
  readingMode: 'study' | 'reader' | 'poetry';
  fontFamily: string;
  fontSize: number;
  lineSpacing: number;
  theme: 'light' | 'dark' | 'sepia' | 'high-contrast';
  columnLayout: 'single' | 'double';
  showVerseNumbers: boolean;
  showRedLetters: boolean;
  audioSpeed: number;
  defaultHighlightColor: string;
  preferences: Record<string, any>;
  updatedAt: string;
}

export interface HighlightColor {
  color: string;
  label: string;
  description?: string;
}

export interface SearchResult {
  verseKey: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  snippet: string;
}

export interface VerseReference {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
}
