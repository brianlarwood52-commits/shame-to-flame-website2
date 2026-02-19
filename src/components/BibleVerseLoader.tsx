import React, { useState, useEffect } from 'react';
import { BookOpen, Loader2, AlertCircle } from 'lucide-react';
import BibleApiService from '../services/bibleApi';

interface BibleVerseLoaderProps {
  reference: string;
  className?: string;
}

const BibleVerseLoader: React.FC<BibleVerseLoaderProps> = ({ 
  reference, 
  className = ''
}) => {
  const [verse, setVerse] = useState<string>('');
  const [verseReference, setVerseReference] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadVerse = async () => {
      try {
        setLoading(true);
        setError('');
        
        const bibleService = new BibleApiService();
        
        console.log('Loading verse:', reference);
        
        // Check if this is a verse range (contains hyphen) or single verse
        const isRange = reference.includes('-');
        const verseData = isRange 
          ? await bibleService.getPassage(reference)
          : await bibleService.getVerse(reference);
        
        // Clean up the verse text with proper spacing
        const cleanVerse = cleanAndFormatVerse(verseData.content || '');
        
        setVerse(cleanVerse);
        setVerseReference(verseData.reference || formatReferenceDisplay(reference));
        
        console.log('Verse loaded successfully:', cleanVerse);
      } catch (err) {
        console.error('Error loading verse:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unable to load verse from Bible service';
        setError(errorMessage);
        setVerseReference(formatReferenceDisplay(reference));
      } finally {
        setLoading(false);
      }
    };

    loadVerse();
  }, [reference]);

  const cleanAndFormatVerse = (content: string): string => {
    if (!content) return '';

    // Remove HTML tags and clean up the content
    let cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/¶/g, '') // Remove paragraph markers
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Fix verse number spacing - add space after numbers at the start
    cleanContent = cleanContent.replace(/^(\d+)([A-Z])/g, '$1 $2');
    
    // Fix verse numbers in the middle of text
    cleanContent = cleanContent.replace(/(\d+)([A-Z][a-z])/g, '$1 $2');
    
    // Handle multiple verses - ensure proper spacing between verse numbers and text
    cleanContent = cleanContent.replace(/(\d+)([A-Z])/g, '$1 $2');
    
    // Clean up any double spaces
    cleanContent = cleanContent.replace(/\s+/g, ' ').trim();

    return cleanContent;
  };

  const formatReferenceDisplay = (ref: string): string => {
    // Convert API format back to readable format
    if (ref.includes('.')) {
      const parts = ref.split('.');
      if (parts.length >= 3) {
        return `${getBookName(parts[0])} ${parts[1]}:${parts[2]}`;
      } else if (parts.length === 2) {
        return `${getBookName(parts[0])} ${parts[1]}`;
      }
    }
    return ref;
  };

  const getBookName = (code: string): string => {
    const bookNames: { [key: string]: string } = {
      'GEN': 'Genesis',
      'EXO': 'Exodus',
      'LEV': 'Leviticus',
      'NUM': 'Numbers',
      'DEU': 'Deuteronomy',
      'JOS': 'Joshua',
      'JDG': 'Judges',
      'RUT': 'Ruth',
      '1SA': '1 Samuel',
      '2SA': '2 Samuel',
      '1KI': '1 Kings',
      '2KI': '2 Kings',
      '1CH': '1 Chronicles',
      '2CH': '2 Chronicles',
      'EZR': 'Ezra',
      'NEH': 'Nehemiah',
      'EST': 'Esther',
      'JOB': 'Job',
      'PSA': 'Psalm',
      'PRO': 'Proverbs',
      'ECC': 'Ecclesiastes',
      'SNG': 'Song of Solomon',
      'ISA': 'Isaiah',
      'JER': 'Jeremiah',
      'LAM': 'Lamentations',
      'EZK': 'Ezekiel',
      'DAN': 'Daniel',
      'HOS': 'Hosea',
      'JOL': 'Joel',
      'AMO': 'Amos',
      'OBA': 'Obadiah',
      'JON': 'Jonah',
      'MIC': 'Micah',
      'NAM': 'Nahum',
      'HAB': 'Habakkuk',
      'ZEP': 'Zephaniah',
      'HAG': 'Haggai',
      'ZEC': 'Zechariah',
      'MAL': 'Malachi',
      'MAT': 'Matthew',
      'MRK': 'Mark',
      'LUK': 'Luke',
      'JHN': 'John',
      'ACT': 'Acts',
      'ROM': 'Romans',
      '1CO': '1 Corinthians',
      '2CO': '2 Corinthians',
      'GAL': 'Galatians',
      'EPH': 'Ephesians',
      'PHP': 'Philippians',
      'COL': 'Colossians',
      '1TH': '1 Thessalonians',
      '2TH': '2 Thessalonians',
      '1TI': '1 Timothy',
      '2TI': '2 Timothy',
      'TIT': 'Titus',
      'PHM': 'Philemon',
      'HEB': 'Hebrews',
      'JAS': 'James',
      '1PE': '1 Peter',
      '2PE': '2 Peter',
      '1JN': '1 John',
      '2JN': '2 John',
      '3JN': '3 John',
      'JUD': 'Jude',
      'REV': 'Revelation'
    };

    return bookNames[code] || code;
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <Loader2 className="h-5 w-5 animate-spin text-flame-500 mr-2" />
        <span className="text-gray-600 dark:text-gray-300">Loading verse...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700 ${className}`}>
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              Unable to load Bible verse
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
              {error}
            </p>
            <p className="text-yellow-600 dark:text-yellow-300 text-sm mt-1">
              Reference: {verseReference}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <blockquote className={`bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-lg p-6 border-l-4 border-flame-400 ${className}`}>
      <div className="flex items-start space-x-3">
        <BookOpen className="h-5 w-5 text-flame-500 mt-1 flex-shrink-0" />
        <div>
          <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed mb-2 text-base">
            "{verse}"
          </p>
          <cite className="text-flame-600 dark:text-flame-400 font-medium text-sm">
            {verseReference}
          </cite>
        </div>
      </div>
    </blockquote>
  );
};

export default BibleVerseLoader;