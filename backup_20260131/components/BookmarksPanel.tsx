'use client';

import React, { useState } from 'react';
import { X, Trash2, Star, ExternalLink } from 'lucide-react';
import { useBibleStudy } from '@/contexts/BibleStudyContext';
import { parseVerseKey, formatVerseReference } from '@/data/bibleBooks';

interface BookmarksPanelProps {
  onClose: () => void;
  onNavigate?: (bookId: number, chapter: number) => void;
}

export default function BookmarksPanel({ onClose, onNavigate }: BookmarksPanelProps) {
  const { bookmarks, removeBookmark } = useBibleStudy();

  function handleNavigate(verseKey: string) {
    const parsed = parseVerseKey(verseKey);
    if (parsed && onNavigate) {
      onNavigate(parsed.bookId, parsed.chapter);
      onClose();
    }
  }

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-bold">Bookmarks</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No bookmarks yet</p>
            <p className="text-sm mt-1">Select a verse and click the bookmark icon</p>
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarks.map(bookmark => {
              const parsed = parseVerseKey(bookmark.verseKey);
              return (
                <div
                  key={bookmark.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: bookmark.color }}
                        />
                        <h3 className="font-semibold">{bookmark.label}</h3>
                      </div>
                      {parsed && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatVerseReference(parsed.bookId, parsed.chapter, parsed.verse)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleNavigate(bookmark.verseKey)}
                        className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900 rounded text-blue-600"
                        title="Go to verse"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
