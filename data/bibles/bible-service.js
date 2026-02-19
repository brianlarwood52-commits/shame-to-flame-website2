/**
 * Bible Data Service for ELIZA Bible Study System
 * Provides verse lookup and search functionality across multiple Bible versions
 */

const fs = require('fs');
const path = require('path');

const BIBLE_DATA_PATH = path.join(__dirname);

// Cache for loaded Bible data
const bibleCache = {};
let bibleIndex = null;

/**
 * Load the Bible index
 * @returns {Object} The bible index with versions and books metadata
 */
function loadBibleIndex() {
    if (bibleIndex) return bibleIndex;
    
    const indexPath = path.join(BIBLE_DATA_PATH, 'bible-index.json');
    if (!fs.existsSync(indexPath)) {
        throw new Error('Bible index not found at: ' + indexPath);
    }
    
    bibleIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    return bibleIndex;
}

/**
 * Normalize book name for file lookup
 * @param {string} book - Book name or abbreviation
 * @returns {string} Normalized book key
 */
function normalizeBookName(book) {
    const index = loadBibleIndex();
    const normalizedInput = book.toLowerCase().replace(/\s+/g, '');
    
    // Direct match
    if (index.books[normalizedInput]) {
        return normalizedInput;
    }
    
    // Search by abbreviation or name
    for (const [key, bookData] of Object.entries(index.books)) {
        if (bookData.name.toLowerCase().replace(/\s+/g, '') === normalizedInput) {
            return key;
        }
        if (bookData.abbrev.some(abbr => abbr.toLowerCase() === normalizedInput)) {
            return key;
        }
    }
    
    return null;
}

/**
 * Load a specific book from a version
 * @param {string} version - Bible version (kjv, nkjv, esv, nasb, nlt)
 * @param {string} book - Book name or abbreviation
 * @returns {Object|null} Book data or null if not found
 */
function loadBook(version, book) {
    const normalizedBook = normalizeBookName(book);
    if (!normalizedBook) return null;
    
    const cacheKey = `${version.toLowerCase()}_${normalizedBook}`;
    if (bibleCache[cacheKey]) {
        return bibleCache[cacheKey];
    }
    
    const bookPath = path.join(BIBLE_DATA_PATH, version.toLowerCase(), `${normalizedBook}.json`);
    if (!fs.existsSync(bookPath)) {
        return null;
    }
    
    const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
    bibleCache[cacheKey] = bookData;
    return bookData;
}

/**
 * Get a specific verse
 * @param {string} book - Book name (e.g., "John", "Genesis", "1 Corinthians")
 * @param {number|string} chapter - Chapter number
 * @param {number|string} verse - Verse number
 * @param {string} version - Bible version (default: "kjv")
 * @returns {Object} Verse result with text and metadata
 */
function getVerse(book, chapter, verse, version = 'kjv') {
    const bookData = loadBook(version, book);
    
    if (!bookData) {
        return {
            success: false,
            error: `Book "${book}" not found in ${version.toUpperCase()}`,
            book,
            chapter,
            verse,
            version
        };
    }
    
    const chapterStr = String(chapter);
    const verseStr = String(verse);
    
    if (!bookData.chapters[chapterStr]) {
        return {
            success: false,
            error: `Chapter ${chapter} not found in ${bookData.name}`,
            book: bookData.name,
            chapter,
            verse,
            version
        };
    }
    
    if (!bookData.chapters[chapterStr][verseStr]) {
        return {
            success: false,
            error: `Verse ${verse} not found in ${bookData.name} ${chapter}`,
            book: bookData.name,
            chapter,
            verse,
            version,
            note: bookData.sampleOnly ? 'This is sample data - verse may exist in full version' : null
        };
    }
    
    return {
        success: true,
        text: bookData.chapters[chapterStr][verseStr],
        book: bookData.name,
        chapter: parseInt(chapter),
        verse: parseInt(verse),
        version: version.toUpperCase(),
        versionName: bookData.versionName,
        reference: `${bookData.name} ${chapter}:${verse}`,
        sampleData: bookData.sampleOnly || false
    };
}

/**
 * Get a range of verses
 * @param {string} book - Book name
 * @param {number} chapter - Chapter number
 * @param {number} startVerse - Starting verse number
 * @param {number} endVerse - Ending verse number
 * @param {string} version - Bible version (default: "kjv")
 * @returns {Object} Verses result with text array and metadata
 */
function getVerseRange(book, chapter, startVerse, endVerse, version = 'kjv') {
    const verses = [];
    for (let v = startVerse; v <= endVerse; v++) {
        const result = getVerse(book, chapter, v, version);
        if (result.success) {
            verses.push({
                verse: v,
                text: result.text
            });
        }
    }
    
    const bookData = loadBook(version, book);
    return {
        success: verses.length > 0,
        verses,
        book: bookData ? bookData.name : book,
        chapter,
        range: `${startVerse}-${endVerse}`,
        version: version.toUpperCase(),
        reference: `${bookData ? bookData.name : book} ${chapter}:${startVerse}-${endVerse}`,
        foundCount: verses.length,
        requestedCount: endVerse - startVerse + 1
    };
}

/**
 * Search the Bible for a query string
 * @param {string} query - Search query
 * @param {string} version - Bible version to search (default: "kjv")
 * @param {Object} options - Search options
 * @returns {Object} Search results
 */
function searchBible(query, version = 'kjv', options = {}) {
    const { 
        limit = 50,
        testament = null,  // 'old' or 'new' or null for both
        book = null        // Specific book to search
    } = options;
    
    const index = loadBibleIndex();
    const results = [];
    const queryLower = query.toLowerCase();
    const versionPath = path.join(BIBLE_DATA_PATH, version.toLowerCase());
    
    if (!fs.existsSync(versionPath)) {
        return {
            success: false,
            error: `Version ${version.toUpperCase()} not found`,
            query,
            version
        };
    }
    
    // Get list of books to search
    let booksToSearch = Object.entries(index.books);
    
    if (testament) {
        booksToSearch = booksToSearch.filter(([_, data]) => data.testament === testament);
    }
    
    if (book) {
        const normalizedBook = normalizeBookName(book);
        if (normalizedBook) {
            booksToSearch = booksToSearch.filter(([key]) => key === normalizedBook);
        }
    }
    
    // Search through books
    for (const [bookKey, bookMeta] of booksToSearch) {
        if (results.length >= limit) break;
        
        const bookData = loadBook(version, bookKey);
        if (!bookData) continue;
        
        for (const [chapterNum, chapter] of Object.entries(bookData.chapters)) {
            if (results.length >= limit) break;
            
            for (const [verseNum, text] of Object.entries(chapter)) {
                if (results.length >= limit) break;
                
                if (text.toLowerCase().includes(queryLower)) {
                    results.push({
                        reference: `${bookMeta.name} ${chapterNum}:${verseNum}`,
                        book: bookMeta.name,
                        chapter: parseInt(chapterNum),
                        verse: parseInt(verseNum),
                        text: text,
                        testament: bookMeta.testament
                    });
                }
            }
        }
    }
    
    return {
        success: true,
        query,
        version: version.toUpperCase(),
        resultCount: results.length,
        limitReached: results.length >= limit,
        results
    };
}

/**
 * Get available Bible versions
 * @returns {Array} List of available versions
 */
function getAvailableVersions() {
    const index = loadBibleIndex();
    return Object.entries(index.versions).map(([key, data]) => ({
        key,
        name: data.name,
        abbreviation: data.abbreviation,
        year: data.year,
        complete: data.complete
    }));
}

/**
 * Get book information
 * @param {string} book - Book name or abbreviation
 * @returns {Object|null} Book metadata
 */
function getBookInfo(book) {
    const index = loadBibleIndex();
    const normalizedBook = normalizeBookName(book);
    if (!normalizedBook) return null;
    return { key: normalizedBook, ...index.books[normalizedBook] };
}

/**
 * Get all books list
 * @param {string} testament - Optional: 'old' or 'new' to filter
 * @returns {Array} List of books
 */
function getAllBooks(testament = null) {
    const index = loadBibleIndex();
    let books = Object.entries(index.books).map(([key, data]) => ({
        key,
        ...data
    }));
    
    if (testament) {
        books = books.filter(b => b.testament === testament);
    }
    
    return books.sort((a, b) => a.order - b.order);
}

module.exports = {
    getVerse,
    getVerseRange,
    searchBible,
    getAvailableVersions,
    getBookInfo,
    getAllBooks,
    loadBibleIndex,
    normalizeBookName
};
