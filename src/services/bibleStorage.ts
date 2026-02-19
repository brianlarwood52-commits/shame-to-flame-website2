import { BibleVerse, CrossReference, UserHighlight, UserNote, UserBookmark, ReadingHistoryEntry, StudyCollection, UserPreferences } from '@/types/bible';

const DB_NAME = 'ShameToFlameBible';
const DB_VERSION = 1;

class BibleStorageService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('verses')) {
          const verseStore = db.createObjectStore('verses', { keyPath: 'verseKey' });
          verseStore.createIndex('bookId', 'bookId');
          verseStore.createIndex('bookChapter', ['bookId', 'chapter']);
        }

        if (!db.objectStoreNames.contains('crossReferences')) {
          const crossRefStore = db.createObjectStore('crossReferences', { keyPath: 'id' });
          crossRefStore.createIndex('fromVerseKey', 'fromVerseKey');
          crossRefStore.createIndex('toVerseKey', 'toVerseKey');
        }

        if (!db.objectStoreNames.contains('highlights')) {
          const highlightStore = db.createObjectStore('highlights', { keyPath: 'id' });
          highlightStore.createIndex('verseKey', 'verseKey');
          highlightStore.createIndex('syncedAt', 'syncedAt');
        }

        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('verseKey', 'verseKey');
          noteStore.createIndex('tags', 'tags', { multiEntry: true });
          noteStore.createIndex('syncedAt', 'syncedAt');
        }

        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarkStore.createIndex('position', 'position');
        }

        if (!db.objectStoreNames.contains('history')) {
          const historyStore = db.createObjectStore('history', { keyPath: 'id' });
          historyStore.createIndex('visitedAt', 'visitedAt');
        }

        if (!db.objectStoreNames.contains('collections')) {
          db.createObjectStore('collections', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('preferences')) {
          db.createObjectStore('preferences', { keyPath: 'userId' });
        }
      };
    });
  }

  async saveVerses(verses: BibleVerse[]): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['verses'], 'readwrite');
    const store = transaction.objectStore('verses');

    for (const verse of verses) {
      store.put(verse);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getVersesByChapter(bookId: number, chapter: number): Promise<BibleVerse[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['verses'], 'readonly');
      const store = transaction.objectStore('verses');
      const index = store.index('bookChapter');
      const request = index.getAll([bookId, chapter]);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getVerse(verseKey: string): Promise<BibleVerse | null> {
    if (!this.db) await this.init();
    if (!this.db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['verses'], 'readonly');
      const store = transaction.objectStore('verses');
      const request = store.get(verseKey);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async searchVerses(query: string, bookId?: number): Promise<BibleVerse[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['verses'], 'readonly');
      const store = transaction.objectStore('verses');
      const request = store.getAll();

      request.onsuccess = () => {
        const verses = request.result || [];
        const normalizedQuery = query.toLowerCase();
        const filtered = verses.filter(verse => {
          if (bookId && verse.bookId !== bookId) return false;
          return verse.text.toLowerCase().includes(normalizedQuery) ||
                 verse.words.some(word => word.toLowerCase().includes(normalizedQuery));
        });
        resolve(filtered);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveCrossReferences(refs: CrossReference[]): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['crossReferences'], 'readwrite');
    const store = transaction.objectStore('crossReferences');

    for (const ref of refs) {
      store.put(ref);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getCrossReferences(verseKey: string): Promise<CrossReference[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['crossReferences'], 'readonly');
      const store = transaction.objectStore('crossReferences');
      const index = store.index('fromVerseKey');
      const request = index.getAll(verseKey);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async saveHighlight(highlight: UserHighlight): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['highlights'], 'readwrite');
    const store = transaction.objectStore('highlights');
    store.put(highlight);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getHighlightsByVerseKey(verseKey: string): Promise<UserHighlight | null> {
    if (!this.db) await this.init();
    if (!this.db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['highlights'], 'readonly');
      const store = transaction.objectStore('highlights');
      const index = store.index('verseKey');
      const request = index.get(verseKey);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllHighlights(): Promise<UserHighlight[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['highlights'], 'readonly');
      const store = transaction.objectStore('highlights');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteHighlight(id: string): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['highlights'], 'readwrite');
    const store = transaction.objectStore('highlights');
    store.delete(id);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async saveNote(note: UserNote): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    store.put(note);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllNotes(): Promise<UserNote[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['notes'], 'readonly');
      const store = transaction.objectStore('notes');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getNotesByVerseKey(verseKey: string): Promise<UserNote[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['notes'], 'readonly');
      const store = transaction.objectStore('notes');
      const index = store.index('verseKey');
      const request = index.getAll(verseKey);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteNote(id: string): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    store.delete(id);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async saveBookmark(bookmark: UserBookmark): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['bookmarks'], 'readwrite');
    const store = transaction.objectStore('bookmarks');
    store.put(bookmark);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllBookmarks(): Promise<UserBookmark[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['bookmarks'], 'readonly');
      const store = transaction.objectStore('bookmarks');
      const request = store.getAll();

      request.onsuccess = () => {
        const bookmarks = request.result || [];
        bookmarks.sort((a, b) => a.position - b.position);
        resolve(bookmarks);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteBookmark(id: string): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['bookmarks'], 'readwrite');
    const store = transaction.objectStore('bookmarks');
    store.delete(id);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async addToHistory(entry: ReadingHistoryEntry): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['history'], 'readwrite');
    const store = transaction.objectStore('history');
    store.put(entry);

    const index = store.index('visitedAt');
    const request = index.openCursor(null, 'prev');
    const entries: string[] = [];

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        entries.push(cursor.primaryKey as string);
        if (entries.length > 100) {
          store.delete(cursor.primaryKey);
        }
        cursor.continue();
      }
    };

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getHistory(limit: number = 20): Promise<ReadingHistoryEntry[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['history'], 'readonly');
      const store = transaction.objectStore('history');
      const index = store.index('visitedAt');
      const request = index.openCursor(null, 'prev');
      const entries: ReadingHistoryEntry[] = [];

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor && entries.length < limit) {
          entries.push(cursor.value);
          cursor.continue();
        } else {
          resolve(entries);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveCollection(collection: StudyCollection): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['collections'], 'readwrite');
    const store = transaction.objectStore('collections');
    store.put(collection);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllCollections(): Promise<StudyCollection[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['collections'], 'readonly');
      const store = transaction.objectStore('collections');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteCollection(id: string): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['collections'], 'readwrite');
    const store = transaction.objectStore('collections');
    store.delete(id);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async savePreferences(preferences: UserPreferences): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const transaction = this.db!.transaction(['preferences'], 'readwrite');
    const store = transaction.objectStore('preferences');
    store.put(preferences);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getPreferences(userId: string): Promise<UserPreferences | null> {
    if (!this.db) await this.init();
    if (!this.db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['preferences'], 'readonly');
      const store = transaction.objectStore('preferences');
      const request = store.get(userId);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }
}

export const bibleStorage = new BibleStorageService();
