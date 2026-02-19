'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronLeft, ChevronRight, Search, Bookmark, Highlighter, StickyNote, Settings, Columns, Type, Maximize2, Volume2, BookOpen, List, Star } from 'lucide-react';
import { useBibleStudy } from '@/contexts/BibleStudyContext';
import { BIBLE_BOOKS, getBookById, POETRY_BOOKS, RED_LETTER_BOOKS } from '@/data/bibleBooks';
import { BibleVerse } from '@/types/bible';
import { bibleStorage } from '@/services/bibleStorage';
import NotesPanel from './NotesPanel';
import BookmarksPanel from './BookmarksPanel';

interface PremiumBibleReaderProps {
  initialBook?: number;
  initialChapter?: number;
}

export default function PremiumBibleReader({ initialBook = 1, initialChapter = 1 }: PremiumBibleReaderProps) {
  const {
    preferences,
    updatePreferences,
    highlights,
    addHighlight,
    removeHighlight,
    getHighlightColor,
    highlightColors,
    addNote,
    notes,
    addBookmark,
    bookmarks,
    addToHistory,
  } = useBibleStudy();

  const [currentBook, setCurrentBook] = useState(initialBook);
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showHighlightPalette, setShowHighlightPalette] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [showBookmarksPanel, setShowBookmarksPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const book = getBookById(currentBook);
  const isPoetry = book && POETRY_BOOKS.includes(book.id);
  const hasRedLetters = book && RED_LETTER_BOOKS.includes(book.id);

  useEffect(() => {
    loadChapter();
  }, [currentBook, currentChapter]);

  async function loadChapter() {
    setLoading(true);
    try {
      let chapterVerses = await bibleStorage.getVersesByChapter(currentBook, currentChapter);

      if (chapterVerses.length === 0) {
        chapterVerses = await fetchAndStoreChapter(currentBook, currentChapter);
      }

      setVerses(chapterVerses);
      addToHistory(`${book?.abbreviation}.${currentChapter}.1`, `${book?.abbreviation}.${currentChapter}`);
    } catch (error) {
      console.error('Error loading chapter:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAndStoreChapter(bookId: number, chapter: number): Promise<BibleVerse[]> {
    const book = getBookById(bookId);
    if (!book) return [];

    const response = await fetch(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${book.abbreviation.toLowerCase()}/chapters/${chapter}.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch chapter');
    }

    const data = await response.json();
    const verses: BibleVerse[] = data.data.map((v: any, index: number) => ({
      id: crypto.randomUUID(),
      bookId,
      chapter,
      verse: index + 1,
      text: v.text || v,
      verseKey: `${book.abbreviation}.${chapter}.${index + 1}`,
      isPoetry: POETRY_BOOKS.includes(bookId),
      isRedLetter: false,
      words: (v.text || v).split(/\s+/),
    }));

    await bibleStorage.saveVerses(verses);
    return verses;
  }

  function nextChapter() {
    if (!book) return;

    if (currentChapter < book.chapterCount) {
      setCurrentChapter(currentChapter + 1);
    } else if (currentBook < 66) {
      setCurrentBook(currentBook + 1);
      setCurrentChapter(1);
    }
  }

  function previousChapter() {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else if (currentBook > 1) {
      const prevBook = getBookById(currentBook - 1);
      if (prevBook) {
        setCurrentBook(currentBook - 1);
        setCurrentChapter(prevBook.chapterCount);
      }
    }
  }

  function handleVerseClick(verseKey: string) {
    setSelectedVerse(selectedVerse === verseKey ? null : verseKey);
  }

  async function handleHighlight(verseKey: string, color: string, label?: string) {
    const existingColor = getHighlightColor(verseKey);

    if (existingColor === color) {
      await removeHighlight(verseKey);
    } else {
      await addHighlight(verseKey, color, label);
    }

    setShowHighlightPalette(false);
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await bibleStorage.searchVerses(searchQuery);
      setSearchResults(results);
      setShowSearch(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }

  function getVerseStyle(verseKey: string) {
    const color = getHighlightColor(verseKey);
    if (!color) return {};

    return {
      backgroundColor: color,
      borderRadius: '4px',
      padding: '2px 4px',
      margin: '-2px -4px',
    };
  }

  const fontSize = preferences?.fontSize || 16;
  const lineSpacing = preferences?.lineSpacing || 150;
  const fontFamily = preferences?.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';
  const theme = preferences?.theme || 'light';
  const readingMode = preferences?.readingMode || 'study';
  const columnLayout = preferences?.columnLayout || 'single';
  const showVerseNumbers = preferences?.showVerseNumbers !== false;

  const themeStyles = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-gray-100',
    sepia: 'bg-amber-50 text-amber-950',
    'high-contrast': 'bg-black text-white',
  };

  return (
    <div className={`min-h-screen ${themeStyles[theme]}`}>
      <div className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-sm bg-opacity-90" style={{ backgroundColor: theme === 'dark' ? '#111827' : theme === 'sepia' ? '#fffbeb' : '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setShowBookSelector(!showBookSelector)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Book className="w-5 h-5" />
              <span className="font-semibold">{book?.name} {currentChapter}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={previousChapter}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                disabled={currentBook === 1 && currentChapter === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextChapter}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                disabled={currentBook === 66 && currentChapter === (book?.chapterCount || 0)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />

              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowHighlightPalette(!showHighlightPalette)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Highlight"
              >
                <Highlighter className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowNotesPanel(!showNotesPanel)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Notes"
              >
                <StickyNote className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowBookmarksPanel(!showBookmarksPanel)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Bookmarks"
              >
                <Star className="w-5 h-5" />
              </button>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search the Bible..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          )}

          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <input
                    type="range"
                    min="12"
                    max="36"
                    value={fontSize}
                    onChange={(e) => updatePreferences({ fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs">{fontSize}px</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Line Spacing</label>
                  <input
                    type="range"
                    min="120"
                    max="200"
                    value={lineSpacing}
                    onChange={(e) => updatePreferences({ lineSpacing: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs">{lineSpacing}%</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => updatePreferences({ fontFamily: e.target.value === 'serif' ? 'serif' : 'sans-serif' })}
                    className="w-full px-2 py-1 rounded border"
                  >
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-serif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => updatePreferences({ theme: e.target.value as any })}
                    className="w-full px-2 py-1 rounded border"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="sepia">Sepia</option>
                    <option value="high-contrast">High Contrast</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showVerseNumbers}
                    onChange={(e) => updatePreferences({ showVerseNumbers: e.target.checked })}
                  />
                  <span className="text-sm">Show verse numbers</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="readingMode"
                    checked={readingMode === 'study'}
                    onChange={() => updatePreferences({ readingMode: 'study' })}
                  />
                  <span className="text-sm">Study Mode</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="readingMode"
                    checked={readingMode === 'reader'}
                    onChange={() => updatePreferences({ readingMode: 'reader' })}
                  />
                  <span className="text-sm">Reader Mode</span>
                </label>
              </div>
            </div>
          )}

          {showHighlightPalette && selectedVerse && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm font-semibold mb-3">Highlight Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {highlightColors.map((hc) => (
                  <button
                    key={hc.color}
                    onClick={() => handleHighlight(selectedVerse, hc.color, hc.label)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    style={{ backgroundColor: hc.color }}
                  >
                    <span className="text-xs font-medium text-gray-900">{hc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        ) : (
          <div
            className={`${columnLayout === 'double' ? 'columns-2 gap-8' : ''}`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${lineSpacing}%`,
              fontFamily,
            }}
          >
            {readingMode === 'study' && verses.map((verse) => (
              <div
                key={verse.verseKey}
                onClick={() => handleVerseClick(verse.verseKey)}
                className={`mb-4 cursor-pointer transition-all ${
                  selectedVerse === verse.verseKey ? 'ring-2 ring-blue-500 rounded-lg p-2' : 'p-2'
                }`}
                style={getVerseStyle(verse.verseKey)}
              >
                {showVerseNumbers && (
                  <span className="inline-block w-8 text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2">
                    {verse.verse}
                  </span>
                )}
                <span>{verse.text}</span>
              </div>
            ))}

            {readingMode === 'reader' && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  {verses.map((verse, index) => (
                    <span
                      key={verse.verseKey}
                      onClick={() => handleVerseClick(verse.verseKey)}
                      className="cursor-pointer"
                      style={getVerseStyle(verse.verseKey)}
                    >
                      {verse.text}
                      {index < verses.length - 1 && ' '}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showBookSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowBookSelector(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">Select Book</h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Old Testament</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {BIBLE_BOOKS.filter(b => b.testament === 'OT').map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setCurrentBook(b.id);
                      setCurrentChapter(1);
                      setShowBookSelector(false);
                    }}
                    className="px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-left text-sm"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">New Testament</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {BIBLE_BOOKS.filter(b => b.testament === 'NT').map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setCurrentBook(b.id);
                      setCurrentChapter(1);
                      setShowBookSelector(false);
                    }}
                    className="px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-left text-sm"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSearch && searchResults.length > 0 && (
        <div className="fixed right-4 top-20 w-96 max-h-[600px] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold mb-3">Search Results ({searchResults.length})</h3>
          <div className="space-y-2">
            {searchResults.slice(0, 50).map((result) => {
              const book = getBookById(result.bookId);
              return (
                <div
                  key={result.verseKey}
                  onClick={() => {
                    setCurrentBook(result.bookId);
                    setCurrentChapter(result.chapter);
                    setShowSearch(false);
                    setSearchResults([]);
                  }}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {book?.name} {result.chapter}:{result.verse}
                  </div>
                  <div className="text-sm">{result.text.substring(0, 100)}...</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showNotesPanel && (
        <NotesPanel
          verseKey={selectedVerse || undefined}
          onClose={() => setShowNotesPanel(false)}
        />
      )}

      {showBookmarksPanel && (
        <BookmarksPanel
          onClose={() => setShowBookmarksPanel(false)}
          onNavigate={(bookId, chapter) => {
            setCurrentBook(bookId);
            setCurrentChapter(chapter);
          }}
        />
      )}
    </div>
  );
}
