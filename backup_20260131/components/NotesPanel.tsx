'use client';

import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Tag, Search, Filter } from 'lucide-react';
import { useBibleStudy } from '@/contexts/BibleStudyContext';
import { UserNote } from '@/types/bible';

interface NotesPanelProps {
  verseKey?: string;
  onClose: () => void;
}

export default function NotesPanel({ verseKey, onClose }: NotesPanelProps) {
  const { notes, addNote, updateNote, deleteNote } = useBibleStudy();
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const filteredNotes = notes.filter(note => {
    if (verseKey && note.verseKey !== verseKey) return false;
    if (searchQuery && !note.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(note.title?.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    if (filterTag && !note.tags.includes(filterTag)) return false;
    return true;
  });

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  async function handleSaveNote() {
    if (!noteContent.trim()) return;

    if (editingNote) {
      await updateNote(editingNote.id, {
        title: noteTitle,
        content: noteContent,
        tags: noteTags,
      });
    } else {
      await addNote({
        userId: 'offline-user',
        verseKey: verseKey,
        noteType: verseKey ? 'verse' : 'journal',
        title: noteTitle || undefined,
        content: noteContent,
        tags: noteTags,
        isPrivate: true,
      });
    }

    resetForm();
  }

  function resetForm() {
    setIsCreating(false);
    setEditingNote(null);
    setNoteContent('');
    setNoteTitle('');
    setNoteTags([]);
    setNewTag('');
  }

  function startEdit(note: UserNote) {
    setEditingNote(note);
    setNoteTitle(note.title || '');
    setNoteContent(note.content);
    setNoteTags(note.tags);
    setIsCreating(true);
  }

  function addTag() {
    if (newTag.trim() && !noteTags.includes(newTag.trim())) {
      setNoteTags([...noteTags, newTag.trim()]);
      setNewTag('');
    }
  }

  function removeTag(tag: string) {
    setNoteTags(noteTags.filter(t => t !== tag));
  }

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 lg:w-[500px] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold">Notes</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-800 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>

        {allTags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterTag('')}
              className={`px-2 py-1 text-xs rounded ${!filterTag ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
                className={`px-2 py-1 text-xs rounded ${filterTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {isCreating ? (
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note title (optional)"
            className="mb-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write your note..."
            className="flex-1 mb-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <div className="mb-3">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag..."
                className="flex-1 px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addTag}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Add
              </button>
            </div>

            {noteTags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {noteTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                  >
                    #{tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveNote}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingNote ? 'Update Note' : 'Save Note'}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No notes yet</p>
              <p className="text-sm mt-1">Click the + button to create your first note</p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                {note.title && (
                  <h3 className="font-semibold mb-2">{note.title}</h3>
                )}
                <p className="text-sm mb-2 whitespace-pre-wrap">{note.content}</p>

                {note.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-2">
                    {note.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(note)}
                      className="p-1 hover:text-blue-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function StickyNote({ className }: { className?: string }) {
  return <span className={className}>📝</span>;
}
