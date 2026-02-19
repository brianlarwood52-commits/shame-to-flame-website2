'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences, UserHighlight, UserNote, UserBookmark, BibleVerse, HighlightColor, ReadingHistoryEntry } from '@/types/bible';
import { bibleStorage } from '@/services/bibleStorage';

interface BibleStudyContextType {
  preferences: UserPreferences | null;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  highlights: Map<string, UserHighlight>;
  addHighlight: (verseKey: string, color: string, colorLabel?: string) => Promise<void>;
  removeHighlight: (verseKey: string) => Promise<void>;
  getHighlightColor: (verseKey: string) => string | null;
  notes: UserNote[];
  addNote: (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: string, updates: Partial<UserNote>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  bookmarks: UserBookmark[];
  addBookmark: (verseKey: string, label: string, color?: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  addToHistory: (verseKey: string, chapterReference: string) => Promise<void>;
  highlightColors: HighlightColor[];
  isLoading: boolean;
}

const BibleStudyContext = createContext<BibleStudyContextType | undefined>(undefined);

const DEFAULT_HIGHLIGHT_COLORS: HighlightColor[] = [
  { color: '#fef08a', label: 'Promises', description: 'Gods promises and commitments' },
  { color: '#93c5fd', label: 'Commands', description: 'Instructions and commandments' },
  { color: '#86efac', label: 'Prophecy', description: 'Prophetic fulfillment' },
  { color: '#fda4af', label: 'Prayer', description: 'Prayer and intercession' },
  { color: '#fdba74', label: 'Favorites', description: 'Personal favorite verses' },
  { color: '#c4b5fd', label: 'Questions', description: 'Unclear or study needed' },
  { color: '#f87171', label: 'Warnings', description: 'Warnings and consequences' },
  { color: '#d8b4fe', label: 'Grace', description: 'Grace and mercy themes' },
];

export function BibleStudyProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [highlights, setHighlights] = useState<Map<string, UserHighlight>>(new Map());
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      await bibleStorage.init();

      const userId = 'offline-user';
      let prefs = await bibleStorage.getPreferences(userId);

      if (!prefs) {
        prefs = {
          userId,
          readingMode: 'study',
          fontFamily: 'serif',
          fontSize: 16,
          lineSpacing: 150,
          theme: 'light',
          columnLayout: 'single',
          showVerseNumbers: true,
          showRedLetters: true,
          audioSpeed: 1.0,
          defaultHighlightColor: '#fef08a',
          preferences: {},
          updatedAt: new Date().toISOString(),
        };
        await bibleStorage.savePreferences(prefs);
      }

      setPreferences(prefs);

      const loadedHighlights = await bibleStorage.getAllHighlights();
      const highlightMap = new Map<string, UserHighlight>();
      loadedHighlights.forEach(h => highlightMap.set(h.verseKey, h));
      setHighlights(highlightMap);

      const loadedNotes = await bibleStorage.getAllNotes();
      setNotes(loadedNotes);

      const loadedBookmarks = await bibleStorage.getAllBookmarks();
      setBookmarks(loadedBookmarks);

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsLoading(false);
    }
  }

  async function updatePreferences(updates: Partial<UserPreferences>) {
    if (!preferences) return;

    const updated: UserPreferences = {
      ...preferences,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await bibleStorage.savePreferences(updated);
    setPreferences(updated);
  }

  async function addHighlight(verseKey: string, color: string, colorLabel?: string) {
    const highlight: UserHighlight = {
      id: crypto.randomUUID(),
      userId: 'offline-user',
      verseKey,
      color,
      colorLabel,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await bibleStorage.saveHighlight(highlight);
    const newHighlights = new Map(highlights);
    newHighlights.set(verseKey, highlight);
    setHighlights(newHighlights);
  }

  async function removeHighlight(verseKey: string) {
    const highlight = highlights.get(verseKey);
    if (!highlight) return;

    await bibleStorage.deleteHighlight(highlight.id);
    const newHighlights = new Map(highlights);
    newHighlights.delete(verseKey);
    setHighlights(newHighlights);
  }

  function getHighlightColor(verseKey: string): string | null {
    const highlight = highlights.get(verseKey);
    return highlight ? highlight.color : null;
  }

  async function addNote(noteData: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) {
    const note: UserNote = {
      ...noteData,
      id: crypto.randomUUID(),
      userId: 'offline-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await bibleStorage.saveNote(note);
    setNotes([...notes, note]);
  }

  async function updateNote(id: string, updates: Partial<UserNote>) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    const updated: UserNote = {
      ...note,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await bibleStorage.saveNote(updated);
    setNotes(notes.map(n => (n.id === id ? updated : n)));
  }

  async function deleteNote(id: string) {
    await bibleStorage.deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
  }

  async function addBookmark(verseKey: string, label: string, color: string = '#3b82f6') {
    const bookmark: UserBookmark = {
      id: crypto.randomUUID(),
      userId: 'offline-user',
      verseKey,
      label,
      color,
      position: bookmarks.length,
      createdAt: new Date().toISOString(),
    };

    await bibleStorage.saveBookmark(bookmark);
    setBookmarks([...bookmarks, bookmark]);
  }

  async function removeBookmark(id: string) {
    await bibleStorage.deleteBookmark(id);
    setBookmarks(bookmarks.filter(b => b.id !== id));
  }

  async function addToHistory(verseKey: string, chapterReference: string) {
    const entry: ReadingHistoryEntry = {
      id: crypto.randomUUID(),
      userId: 'offline-user',
      verseKey,
      chapterReference,
      visitedAt: new Date().toISOString(),
    };

    await bibleStorage.addToHistory(entry);
  }

  return (
    <BibleStudyContext.Provider
      value={{
        preferences,
        updatePreferences,
        highlights,
        addHighlight,
        removeHighlight,
        getHighlightColor,
        notes,
        addNote,
        updateNote,
        deleteNote,
        bookmarks,
        addBookmark,
        removeBookmark,
        addToHistory,
        highlightColors: DEFAULT_HIGHLIGHT_COLORS,
        isLoading,
      }}
    >
      {children}
    </BibleStudyContext.Provider>
  );
}

export function useBibleStudy() {
  const context = useContext(BibleStudyContext);
  if (context === undefined) {
    throw new Error('useBibleStudy must be used within a BibleStudyProvider');
  }
  return context;
}
