'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Settings, Search, Bookmark, Share2, Type, Key, Play, Pause, Square, Volume2, VolumeX, User, HelpCircle, Download, Star, CheckCircle } from 'lucide-react';
// Using local JSON Bible service instead of external API
import { getChapter, getAvailableVersions, type BibleVersion } from '../lib/bible-service';
import { bibleBooks, getBookById } from '../data/bibleData';
import { detectPlatform, rankVoices, getVoiceQualityBadge, getDownloadInstructions, getPlatformName, type Platform, type VoiceQuality } from '../utils/voiceUtils';

// Local Bible versions from JSON files
const LOCAL_VERSIONS = [
  { key: 'kjv', name: 'King James Version', abbreviation: 'KJV' },
  { key: 'nkjv', name: 'New King James Version', abbreviation: 'NKJV' },
  { key: 'esv', name: 'English Standard Version', abbreviation: 'ESV' },
  { key: 'nasb', name: 'New American Standard Bible', abbreviation: 'NASB' },
  { key: 'nlt', name: 'New Living Translation', abbreviation: 'NLT' },
] as const;

interface BibleReaderProps {
}

const BibleReader: React.FC<BibleReaderProps> = () => {
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion>('kjv');
  const [selectedBook, setSelectedBook] = useState('John');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [startVerse, setStartVerse] = useState<number | null>(null);
  const [endVerse, setEndVerse] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fontSize, setFontSize] = useState('text-lg');
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Voice reading state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [parsedVerses, setParsedVerses] = useState<Array<{number: string, text: string, words: string[]}>>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVerseForReading, setSelectedVerseForReading] = useState<number | null>(null);
  const [rankedVoices, setRankedVoices] = useState<VoiceQuality[]>([]);
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [showVoiceLibrary, setShowVoiceLibrary] = useState(false);

  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentBook = getBookById(selectedBook) || bibleBooks.find(b => b.name === selectedBook);
  const currentVersion = LOCAL_VERSIONS.find(v => v.key === selectedVersion);

  useEffect(() => {
    const detectedPlatform = detectPlatform();
    setPlatform(detectedPlatform);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      setAvailableVoices(englishVoices);

      const ranked = rankVoices(englishVoices, platform);
      setRankedVoices(ranked);

      if (ranked.length > 0 && !selectedVoice) {
        setSelectedVoice(ranked[0].voice);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [platform]);

  const previewVoice = (voice: SpeechSynthesisVoice) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    setPreviewingVoice(voice.name);

    const utterance = new SpeechSynthesisUtterance(
      "For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life."
    );
    utterance.voice = voice;
    utterance.rate = speechRate;
    utterance.volume = speechVolume;

    utterance.onend = () => {
      setPreviewingVoice(null);
    };

    utterance.onerror = () => {
      setPreviewingVoice(null);
    };

    speechSynthesis.speak(utterance);
  };

  const stopPreview = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setPreviewingVoice(null);
  };

  useEffect(() => {
    loadContent();
  }, [selectedVersion, selectedBook, selectedChapter, startVerse, endVerse]);

  useEffect(() => {
    // Stop speech when content changes
    stopReading();
  }, [content]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopReading();
    };
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');

      // Use local JSON Bible service
      const bookName = currentBook?.name || selectedBook;
      console.log('Loading Bible content:', bookName, selectedChapter, selectedVersion);

      const result = await getChapter(bookName, selectedChapter, selectedVersion);

      if (!result.success || !result.verses) {
        setError(result.error || 'Failed to load chapter');
        setContent('');
        return;
      }

      // Format verses - filter by verse range if specified
      let verses = result.verses;
      if (startVerse) {
        const start = startVerse;
        const end = endVerse || startVerse;
        verses = verses.filter(v => v.verse >= start && v.verse <= end);
      }

      // Format the content with verse numbers
      const formattedContent = verses
        .map(v => `${v.verse} ${v.text}`)
        .join('\n\n');
      
      setContent(formattedContent);
    } catch (err) {
      console.error('Error loading Bible content:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load Bible content';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Parse content into verses with words for highlighting
  const parseContentForReading = (content: string) => {
    if (!content) return [];

    const verses = content.split('\n\n').filter(verse => verse.trim());
    const parsedVerses = verses.map(verse => {
      const trimmedVerse = verse.trim();
      const verseMatch = trimmedVerse.match(/^(\d+)\s+(.+)$/s);
      
      if (verseMatch) {
        const [, verseNumber, verseText] = verseMatch;
        const words = verseText.split(/\s+/).filter(word => word.length > 0);
        return { number: verseNumber, text: verseText, words };
      } else {
        const words = trimmedVerse.split(/\s+/).filter(word => word.length > 0);
        return { number: '1', text: trimmedVerse, words };
      }
    });

    setParsedVerses(parsedVerses);
    return parsedVerses;
  };

  // Start reading from current position or selected verse
  const startReading = (fromVerseIndex?: number, readOnlyThisVerse: boolean = false) => {
    if (!content) return;

    const verses = parseContentForReading(content);
    if (verses.length === 0) return;

    const startIndex = fromVerseIndex !== undefined ? fromVerseIndex : currentVerseIndex;
    setIsPlaying(true);
    setIsPaused(false);
    setSelectedVerseForReading(readOnlyThisVerse ? startIndex : null);
    readVerse(startIndex, 0, readOnlyThisVerse);
  };

  // Read a specific verse starting from a word index
  // Track if current voice supports boundary events (detected at runtime)
  const voiceSupportsBoundaryRef = useRef<boolean | null>(null);
  
  // Word-by-word reading mode for voices without boundary events
  const readWordByWord = (verseIndex: number, wordIndex: number, readOnlyThisVerse: boolean) => {
    const verse = parsedVerses[verseIndex];
    if (!verse || wordIndex >= verse.words.length) {
      // Verse complete
      if (readOnlyThisVerse) {
        stopReading();
        return;
      }
      // Move to next verse
      if (verseIndex + 1 < parsedVerses.length) {
        setCurrentVerseIndex(verseIndex + 1);
        setCurrentWordIndex(0);
        timeoutRef.current = setTimeout(() => {
          readWordByWord(verseIndex + 1, 0, false);
        }, 150); // Small pause between verses
      } else {
        stopReading();
      }
      return;
    }

    setCurrentVerseIndex(verseIndex);
    setCurrentWordIndex(wordIndex);

    const word = verse.words[wordIndex];
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = speechRate;
    utterance.volume = isMuted ? 0 : speechVolume;
    utterance.voice = selectedVoice;

    utterance.onend = () => {
      // Move to next word immediately
      readWordByWord(verseIndex, wordIndex + 1, readOnlyThisVerse);
    };

    utterance.onerror = () => {
      stopReading();
    };

    speechSynthesisRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const readVerse = (verseIndex: number, wordIndex: number = 0, readOnlyThisVerse: boolean = false) => {
    if (verseIndex >= parsedVerses.length) {
      stopReading();
      return;
    }

    const verse = parsedVerses[verseIndex];
    if (!verse || wordIndex >= verse.words.length) {
      if (readOnlyThisVerse) {
        stopReading();
        return;
      }
      setCurrentVerseIndex(verseIndex + 1);
      setCurrentWordIndex(0);
      readVerse(verseIndex + 1, 0, false);
      return;
    }

    setCurrentVerseIndex(verseIndex);
    setCurrentWordIndex(wordIndex);

    // If we already know this voice doesn't support boundary events, use word-by-word
    if (voiceSupportsBoundaryRef.current === false) {
      readWordByWord(verseIndex, wordIndex, readOnlyThisVerse);
      return;
    }

    // Create speech for remaining words in the verse
    const remainingWords = verse.words.slice(wordIndex);
    const textToSpeak = remainingWords.join(' ');

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speechRate;
      utterance.volume = isMuted ? 0 : speechVolume;
      utterance.voice = selectedVoice;

      let boundaryEventFired = false;
      let switchedToWordByWord = false;

      // Track word position using boundary events (works with Microsoft voices)
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          boundaryEventFired = true;
          voiceSupportsBoundaryRef.current = true; // Remember this voice works
          const spokenText = textToSpeak.substring(0, event.charIndex);
          const wordsSpoken = spokenText.split(/\s+/).filter(w => w.length > 0).length;
          setCurrentWordIndex(wordIndex + wordsSpoken);
        }
      };
      
      // Check if boundary events fire, otherwise switch to word-by-word
      utterance.onstart = () => {
        setTimeout(() => {
          if (!boundaryEventFired && remainingWords.length > 1 && !switchedToWordByWord) {
            // No boundary events - cancel and switch to word-by-word mode
            console.log('Voice does not support boundary events, switching to word-by-word mode');
            voiceSupportsBoundaryRef.current = false;
            switchedToWordByWord = true;
            speechSynthesis.cancel();
            readWordByWord(verseIndex, wordIndex, readOnlyThisVerse);
          }
        }, 150);
      };

      utterance.onend = () => {
        if (switchedToWordByWord) return; // Already handled
        
        if (readOnlyThisVerse) {
          stopReading();
          return;
        }
        
        setCurrentVerseIndex(verseIndex + 1);
        setCurrentWordIndex(0);
        
        if (verseIndex + 1 < parsedVerses.length) {
          timeoutRef.current = setTimeout(() => {
            readVerse(verseIndex + 1, 0, false);
          }, 300);
        } else {
          stopReading();
        }
      };

      utterance.onerror = (e) => {
        if (switchedToWordByWord) return; // Expected cancel
        stopReading();
      };

      speechSynthesisRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  // Pause reading
  const pauseReading = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Resume reading
  const resumeReading = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  // Stop reading
  const stopReading = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (speechSynthesis.speaking || speechSynthesis.paused) {
      speechSynthesis.cancel();
    }
    
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentVerseIndex(0);
    setCurrentWordIndex(0);
    setSelectedVerseForReading(null);
    speechSynthesisRef.current = null;
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.volume = isMuted ? speechVolume : 0;
    }
  };

  // Handle verse click for reading
  const handleVerseClick = (verseIndex: number, event: React.MouseEvent) => {
    // Check if user is selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return; // Don't interfere with text selection
    }

    // Stop current reading
    if (isPlaying) {
      stopReading();
    }

    // Determine reading mode based on modifier keys
    if (event.shiftKey) {
      // Shift+click: Read only this verse
      startReading(verseIndex, true);
    } else if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd+click: Start reading from this verse onwards
      startReading(verseIndex, false);
    } else {
      // Regular click: Just highlight the verse (could add other functionality)
      setCurrentVerseIndex(verseIndex);
      setCurrentWordIndex(0);
    }
  };

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(prev => prev - 1);
      setStartVerse(null);
      setEndVerse(null);
    } else {
      // Go to previous book's last chapter
      const currentIndex = bibleBooks.findIndex(book => book.name === selectedBook);
      if (currentIndex > 0) {
        const previousBook = bibleBooks[currentIndex - 1];
        setSelectedBook(previousBook.name);
        setSelectedChapter(previousBook.chapters);
        setStartVerse(null);
        setEndVerse(null);
      }
    }
  };

  const handleNextChapter = () => {
    if (currentBook && selectedChapter < currentBook.chapters) {
      setSelectedChapter(prev => prev + 1);
      setStartVerse(null);
      setEndVerse(null);
    } else {
      // Go to next book's first chapter
      const currentIndex = bibleBooks.findIndex(book => book.name === selectedBook);
      if (currentIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentIndex + 1];
        setSelectedBook(nextBook.name);
        setSelectedChapter(1);
        setStartVerse(null);
        setEndVerse(null);
      }
    }
  };

  const formatReference = () => {
    if (!currentBook) return '';
    
    let ref = `${currentBook.name} ${selectedChapter}`;
    if (startVerse) {
      ref += `:${startVerse}`;
      if (endVerse && endVerse !== startVerse) {
        ref += `-${endVerse}`;
      }
    }
    return ref;
  };

  const canGoPrevious = () => {
    if (selectedChapter > 1) return true;
    const currentIndex = bibleBooks.findIndex(book => book.name === selectedBook);
    return currentIndex > 0;
  };

  const canGoNext = () => {
    if (currentBook && selectedChapter < currentBook.chapters) return true;
    const currentIndex = bibleBooks.findIndex(book => book.name === selectedBook);
    return currentIndex < bibleBooks.length - 1;
  };

  // Function to render formatted content with improved typography and highlighting
  const renderFormattedContent = (content: string) => {
    if (!content) return null;

    // Split content by double line breaks (verse separators)
    const verses = content.split('\n\n').filter(verse => verse.trim());
    
    return (
      <div className="space-y-4">
        {verses.map((verse, verseIndex) => {
          const trimmedVerse = verse.trim();
          if (!trimmedVerse) return null;

          // Extract verse number and text
          const verseMatch = trimmedVerse.match(/^(\d+)\s+(.+)$/s);
          
          if (verseMatch) {
            const [, verseNumber, verseText] = verseMatch;
            const words = verseText.split(/\s+/).filter(word => word.length > 0);
            
            return (
              <div 
                key={verseIndex} 
                className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors duration-200"
                onClick={(e) => handleVerseClick(verseIndex, e)}
                title="Click to select • Shift+click to read this verse only • Ctrl+click to read from here"
              >
                <span className="inline-block">
                  <span className={`text-sm font-bold mr-3 select-none transition-all duration-200 px-2 py-1 rounded-full ${
                    isPlaying && currentVerseIndex === verseIndex 
                      ? 'text-white bg-flame-600 shadow-lg' 
                      : 'text-flame-600 dark:text-flame-400 bg-flame-100 dark:bg-flame-900/30 hover:bg-flame-200 dark:hover:bg-flame-800/50'
                  }`}>
                    {verseNumber}
                  </span>
                  <span className="leading-relaxed text-gray-800 dark:text-gray-100">
                    {words.map((word, wordIndex) => {
                      const isCurrentWord = isPlaying && 
                        currentVerseIndex === verseIndex && 
                        currentWordIndex === wordIndex;
                      
                      return (
                        <span
                          key={wordIndex}
                          className={`transition-all duration-200 ${
                            isCurrentWord 
                              ? 'bg-flame-200 dark:bg-flame-800 text-flame-900 dark:text-flame-100 px-1 rounded shadow-sm font-medium' 
                              : ''
                          }`}
                        >
                          {word}
                          {wordIndex < words.length - 1 ? ' ' : ''}
                        </span>
                      );
                    })}
                  </span>
                </span>
              </div>
            );
          } else {
            // If no verse number found, display as regular text
            return (
              <div key={verseIndex} className="leading-relaxed text-gray-800 dark:text-gray-100 p-2">
                {trimmedVerse}
              </div>
            );
          }
        })}
      </div>
    );
  };

  const getFontSizeClasses = () => {
    const sizeMap: { [key: string]: string } = {
      'text-sm': 'text-sm leading-6',
      'text-base': 'text-base leading-7',
      'text-lg': 'text-lg leading-8',
      'text-xl': 'text-xl leading-9',
      'text-2xl': 'text-2xl leading-10'
    };
    return sizeMap[fontSize] || 'text-lg leading-8';
  };

  // Parse content when it changes
  useEffect(() => {
    if (content) {
      parseContentForReading(content);
    }
  }, [content]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Controls */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20 dark:border-gray-700/50">
        <div className="flex flex-col gap-4">
          {/* Version and Book Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Translation
              </label>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value as BibleVersion)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {LOCAL_VERSIONS.map((version) => (
                  <option key={version.key} value={version.key}>
                    {version.abbreviation} - {version.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Book
              </label>
              <select
                value={selectedBook}
                onChange={(e) => {
                  setSelectedBook(e.target.value);
                  setSelectedChapter(1);
                  setStartVerse(null);
                  setEndVerse(null);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <optgroup label="Old Testament">
                  {bibleBooks.filter(book => book.testament === 'Old').map((book) => (
                    <option key={book.name} value={book.name}>
                      {book.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="New Testament">
                  {bibleBooks.filter(book => book.testament === 'New').map((book) => (
                    <option key={book.name} value={book.name}>
                      {book.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Chapter
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => {
                  setSelectedChapter(Number(e.target.value));
                  setStartVerse(null);
                  setEndVerse(null);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {currentBook && Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Verse Range Selection */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-4 sm:items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Verse (Optional)
              </label>
              <input
                type="number"
                min="1"
                value={startVerse || ''}
                onChange={(e) => setStartVerse(e.target.value ? Number(e.target.value) : null)}
                placeholder="All"
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Verse
              </label>
              <input
                type="number"
                min={startVerse || 1}
                value={endVerse || ''}
                onChange={(e) => setEndVerse(e.target.value ? Number(e.target.value) : null)}
                placeholder={startVerse ? startVerse.toString() : ''}
                disabled={!startVerse}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              title="Settings"
            >
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              title="Bookmark"
            >
              <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              title="Share"
            >
              <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Font Size:</span>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="text-sm">Small</option>
                  <option value="text-base">Medium</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">Extra Large</option>
                  <option value="text-2xl">XXL</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Speed:</span>
                <select
                  value={speechRate}
                  onChange={(e) => setSpeechRate(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={speechVolume}
                  onChange={(e) => setSpeechVolume(Number(e.target.value))}
                  className="flex-1"
                />
              </div>

              <div className="col-span-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Voice:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowVoiceLibrary(!showVoiceLibrary)}
                      className="text-xs px-2 py-1 bg-flame-100 dark:bg-flame-900/30 text-flame-700 dark:text-flame-300 rounded hover:bg-flame-200 dark:hover:bg-flame-800/50 transition-colors"
                    >
                      Voice Library
                    </button>
                    <button
                      onClick={() => setShowVoiceHelp(true)}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Get Better Voices
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <select
                    value={selectedVoice?.name || ''}
                    onChange={(e) => {
                      const voiceData = rankedVoices.find(v => v.voice.name === e.target.value);
                      if (voiceData) {
                        setSelectedVoice(voiceData.voice);
                        voiceSupportsBoundaryRef.current = null; // Reset detection for new voice
                      }
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {rankedVoices.map((voiceData) => {
                      const badge = getVoiceQualityBadge(voiceData.quality);
                      return (
                        <option key={voiceData.voice.name} value={voiceData.voice.name}>
                          {voiceData.voice.name} [{badge.text}] {voiceData.isPlatformOptimal ? '⭐' : ''}
                        </option>
                      );
                    })}
                  </select>
                  {selectedVoice && (
                    <button
                      onClick={() => previewingVoice === selectedVoice.name ? stopPreview() : previewVoice(selectedVoice)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        previewingVoice === selectedVoice.name
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {previewingVoice === selectedVoice.name ? (
                        <Square className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                {selectedVoice && rankedVoices.find(v => v.voice.name === selectedVoice.name) && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {(() => {
                      const voiceData = rankedVoices.find(v => v.voice.name === selectedVoice.name);
                      if (!voiceData) return null;
                      const badge = getVoiceQualityBadge(voiceData.quality);
                      return (
                        <>
                          <span className={`px-2 py-0.5 rounded-full ${badge.bgColor} ${badge.color} font-medium`}>
                            {badge.text}
                          </span>
                          {voiceData.isPlatformOptimal && (
                            <span className="flex items-center gap-1 text-yellow-700 dark:text-yellow-300">
                              <Star className="h-3 w-3 fill-current" />
                              Optimized for {getPlatformName(platform)}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audio Controls */}
      {content && !loading && !error && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    onClick={() => startReading()}
                    className="flex items-center gap-2 bg-flame-600 hover:bg-flame-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <Play className="h-4 w-4" />
                    Read Aloud
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {!isPaused ? (
                      <button
                        onClick={pauseReading}
                        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <Pause className="h-4 w-4" />
                        Pause
                      </button>
                    ) : (
                      <button
                        onClick={resumeReading}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <Play className="h-4 w-4" />
                        Resume
                      </button>
                    )}
                    <button
                      onClick={stopReading}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Square className="h-4 w-4" />
                      Stop
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleMute}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
            
            <div className="text-right">
              {isPlaying && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Reading verse {currentVerseIndex + 1} of {parsedVerses.length}
                  {selectedVerseForReading !== null && (
                    <div className="text-xs text-flame-600 dark:text-flame-400">
                      Single verse mode
                    </div>
                  )}
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Click verse • Shift+click: read verse only • Ctrl+click: read from verse
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePreviousChapter}
          disabled={!canGoPrevious()}
          className="inline-flex items-center px-4 py-2 bg-flame-600 hover:bg-flame-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </button>

        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white">
            {formatReference()}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentVersion?.name}
          </p>
        </div>

        <button
          onClick={handleNextChapter}
          disabled={!canGoNext()}
          className="inline-flex items-center px-4 py-2 bg-flame-600 hover:bg-flame-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-flame-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading...</span>
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Key className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  {error.includes('API key') ? 'Bible API Key Required' : 'Error Loading Content'}
                </p>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && content && (
          <div className={`p-8 ${getFontSizeClasses()}`}>
            <div className="font-serif text-gray-800 dark:text-gray-100 max-w-4xl mx-auto">
              {renderFormattedContent(content)}
            </div>
          </div>
        )}

        {!loading && !error && !content && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Loading Bible Content
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Please wait while we load the Bible content for you.
            </p>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      {!loading && !error && content && (
        <div className="mt-8 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/50">
          <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => { setSelectedBook('Psalms'); setSelectedChapter(23); setStartVerse(null); setEndVerse(null); }}
              className="text-left p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-colors duration-200"
            >
              <div className="font-medium text-gray-800 dark:text-white">Psalm 23</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">The Lord is my shepherd</div>
            </button>
            <button
              onClick={() => { setSelectedBook('John'); setSelectedChapter(3); setStartVerse(16); setEndVerse(null); }}
              className="text-left p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-colors duration-200"
            >
              <div className="font-medium text-gray-800 dark:text-white">John 3:16</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">For God so loved the world</div>
            </button>
            <button
              onClick={() => { setSelectedBook('Romans'); setSelectedChapter(8); setStartVerse(28); setEndVerse(null); }}
              className="text-left p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-colors duration-200"
            >
              <div className="font-medium text-gray-800 dark:text-white">Romans 8:28</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">All things work together</div>
            </button>
            <button
              onClick={() => { setSelectedBook('Philippians'); setSelectedChapter(4); setStartVerse(13); setEndVerse(null); }}
              className="text-left p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-colors duration-200"
            >
              <div className="font-medium text-gray-800 dark:text-white">Philippians 4:13</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">I can do all things</div>
            </button>
          </div>
        </div>
      )}

      {showVoiceLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Voice Library</h3>
                <button
                  onClick={() => {
                    setShowVoiceLibrary(false);
                    stopPreview();
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {rankedVoices.length} voice{rankedVoices.length !== 1 ? 's' : ''} available • Platform: {getPlatformName(platform)}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {rankedVoices.map((voiceData) => {
                  const badge = getVoiceQualityBadge(voiceData.quality);
                  const isSelected = selectedVoice?.name === voiceData.voice.name;
                  const isPreviewing = previewingVoice === voiceData.voice.name;

                  return (
                    <div
                      key={voiceData.voice.name}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-flame-500 bg-flame-50 dark:bg-flame-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {voiceData.voice.name}
                            </h4>
                            {isSelected && (
                              <CheckCircle className="h-4 w-4 text-flame-600 dark:text-flame-400" />
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className={`px-2 py-0.5 rounded-full ${badge.bgColor} ${badge.color} font-medium`}>
                              {badge.text}
                            </span>
                            {voiceData.isPlatformOptimal && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                                <Star className="h-3 w-3 fill-current" />
                                Best for {getPlatformName(platform)}
                              </span>
                            )}
                            {voiceData.voice.localService && (
                              <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                Local
                              </span>
                            )}
                            <span className="text-gray-600 dark:text-gray-400">
                              {voiceData.voice.lang}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => isPreviewing ? stopPreview() : previewVoice(voiceData.voice)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isPreviewing
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {isPreviewing ? (
                              <Square className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          {!isSelected && (
                            <button
                              onClick={() => {
                                setSelectedVoice(voiceData.voice);
                                voiceSupportsBoundaryRef.current = null; // Reset detection for new voice
                                setShowVoiceLibrary(false);
                                stopPreview();
                              }}
                              className="px-3 py-2 rounded-lg text-sm font-medium bg-flame-600 hover:bg-flame-700 text-white transition-colors"
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <button
                onClick={() => setShowVoiceHelp(true)}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Better Voices for {getPlatformName(platform)}
              </button>
            </div>
          </div>
        </div>
      )}

      {showVoiceHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-flame-50 dark:from-blue-900/30 dark:to-flame-900/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {getDownloadInstructions(platform).title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get the best audio quality for Bible reading
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVoiceHelp(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Why Download Better Voices?
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Premium voices sound significantly more natural and are easier to listen to for extended periods. They provide a better Bible reading experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-flame-600 text-white rounded-full text-sm">
                      1
                    </span>
                    Follow these steps:
                  </h4>
                  <ol className="space-y-3">
                    {getDownloadInstructions(platform).steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 flex-1 pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {getDownloadInstructions(platform).note && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                          Important Note
                        </h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          {getDownloadInstructions(platform).note}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/20 dark:to-flame-900/20 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Current Voice Quality
                  </h4>
                  {selectedVoice && rankedVoices.find(v => v.voice.name === selectedVoice.name) && (
                    <div className="flex items-center gap-2">
                      {(() => {
                        const voiceData = rankedVoices.find(v => v.voice.name === selectedVoice.name);
                        if (!voiceData) return null;
                        const badge = getVoiceQualityBadge(voiceData.quality);
                        return (
                          <>
                            <span className={`px-3 py-1 rounded-full ${badge.bgColor} ${badge.color} font-medium`}>
                              {badge.text}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {selectedVoice.name}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  )}
                  {rankedVoices.some(v => v.quality === 'premium' || v.quality === 'enhanced') ? (
                    <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                      Great news! You already have some high-quality voices installed. Check the Voice Library to try them.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Follow the steps above to download better voices for an enhanced listening experience.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <button
                onClick={() => setShowVoiceHelp(false)}
                className="w-full px-4 py-3 bg-flame-600 hover:bg-flame-700 text-white rounded-lg font-medium transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;