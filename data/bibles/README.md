# Bible Data for ELIZA Bible Study System

This directory contains Bible text data organized for the ELIZA Bible Study system.

## Directory Structure

```
data/bibles/
â”œâ”€â”€ bible-index.json      # Master index of versions and books
â”œâ”€â”€ bible-service.js      # Node.js service module for verse lookup
â”œâ”€â”€ README.md             # This file
â”œâ”€â”€ kjv/                  # King James Version
â”‚   â”œâ”€â”€ metadata.json     # Version metadata
â”‚   â”œâ”€â”€ genesis.json      # Book files (sample data)
â”‚   â”œâ”€â”€ john.json
â”‚   â”œâ”€â”€ psalms.json
â”‚   â””â”€â”€ romans.json
â”œâ”€â”€ nkjv/                 # New King James Version
â”‚   â”œâ”€â”€ metadata.json
â”‚   â””â”€â”€ john.json
â”œâ”€â”€ esv/                  # English Standard Version
â”‚   â”œâ”€â”€ metadata.json
â”‚   â””â”€â”€ john.json
â”œâ”€â”€ nasb/                 # New American Standard Bible
â”‚   â”œâ”€â”€ metadata.json
â”‚   â””â”€â”€ john.json
â””â”€â”€ nlt/                  # New Living Translation
    â”œâ”€â”€ metadata.json
    â””â”€â”€ john.json
```

## JSON Structure

### Book File Format
Each book file follows this structure:

```json
{
  "book": "john",
  "name": "John",
  "version": "kjv",
  "versionName": "King James Version",
  "chapters": {
    "1": {
      "1": "In the beginning was the Word...",
      "2": "The same was in the beginning with God."
    },
    "3": {
      "16": "For God so loved the world..."
    }
  },
  "totalChapters": 21,
  "isComplete": false,
  "sampleOnly": true
}
```

## API Usage

### Import the Service
```javascript
const bible = require('./data/bibles/bible-service');
```

### Get a Verse
```javascript
// getVerse(book, chapter, verse, version)
const result = bible.getVerse('John', 3, 16, 'kjv');
// Returns:
// {
//   success: true,
//   text: "For God so loved the world...",
//   book: "John",
//   chapter: 3,
//   verse: 16,
//   version: "KJV",
//   reference: "John 3:16"
// }
```

### Get Verse Range
```javascript
// getVerseRange(book, chapter, startVerse, endVerse, version)
const result = bible.getVerseRange('Psalm', 23, 1, 6, 'kjv');
```

### Search Bible
```javascript
// searchBible(query, version, options)
const results = bible.searchBible('love', 'kjv', {
    limit: 20,
    testament: 'new',  // 'old', 'new', or null for both
    book: null         // specific book or null for all
});
```

### Get Available Versions
```javascript
const versions = bible.getAvailableVersions();
// Returns array of version metadata
```

### Get All Books
```javascript
const books = bible.getAllBooks('new');  // 'old', 'new', or null for all
```

## Populating Full Bible Data

The current files contain SAMPLE DATA only. To populate with full Bible text:

### Option 1: Download from Public Sources
For KJV (public domain):
- https://github.com/thiagobodruk/bible (multiple formats)
- https://github.com/scrollmapper/bible_databases

### Option 2: Convert Existing Data
Use this structure for each book file:
```json
{
  "book": "bookkey",
  "name": "Book Name",
  "version": "kjv",
  "versionName": "King James Version",
  "chapters": {
    "1": { "1": "verse text", "2": "verse text" },
    "2": { "1": "verse text" }
  },
  "totalChapters": N,
  "isComplete": true,
  "sampleOnly": false
}
```

### Copyright Notice
- KJV: Public Domain
- NKJV, ESV, NASB, NLT: Copyrighted - ensure proper licensing before use

## Supported Versions

| Version | Name                        | Year | Status      |
|---------|----------------------------|------|-------------|
| KJV     | King James Version         | 1611 | Sample Data |
| NKJV    | New King James Version     | 1982 | Sample Data |
| ESV     | English Standard Version   | 2001 | Sample Data |
| NASB    | New American Standard Bible| 1971 | Sample Data |
| NLT     | New Living Translation     | 1996 | Sample Data |

## Book Name Resolution

The service supports multiple formats for book names:
- Full name: "Genesis", "1 Corinthians", "Song of Solomon"
- Abbreviations: "Gen", "1Cor", "SOS"
- Case insensitive: "JOHN", "john", "John" all work

See `bible-index.json` for the complete list of accepted abbreviations.
