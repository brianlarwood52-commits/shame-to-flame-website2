'use client'

import React, { useState } from 'react';
import { Search, Book, Loader2, ExternalLink, AlertCircle } from 'lucide-react';

interface SearchResult {
  identifier: string;
  title: string;
  description?: string;
  creator?: string;
  date?: string;
  subject?: string[];
  downloads?: number;
  format?: string[];
}

interface ArchiveResponse {
  response: {
    docs: SearchResult[];
    numFound: number;
    start: number;
  };
}

const SDACommentarySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const searchArchive = async (query: string, page: number = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Internet Archive Search API
      // Searching specifically for SDA Bible Commentary materials
      // Enhanced search for Bible verses - handle different formats
      let enhancedQuery = query;
      
      // If it looks like a Bible reference, add variations
      const bibleRefMatch = query.match(/(\w+)\s*(\d+):(\d+)/i);
      if (bibleRefMatch) {
        const [, book, chapter, verse] = bibleRefMatch;
        enhancedQuery = `("${query}" OR "${book} ${chapter}:${verse}" OR "${book.toLowerCase()} ${chapter}:${verse}" OR "${book} chapter ${chapter}" OR "${book} ${chapter}")`;
      }
      
      // Restrict search to ONLY SDA Bible Commentary materials
      // Based on the example URL, target the specific SDA Bible Commentary collection
      const searchQuery = `(${enhancedQuery}) AND collection:SdaBibleCommentary1980`;
      
      const start = (page - 1) * resultsPerPage;
      
      const params = new URLSearchParams({
        q: searchQuery,
        fl: 'identifier,title,description,creator,date,subject,downloads,format',
        'sort[]': 'downloads desc',
        rows: resultsPerPage.toString(),
        start: start.toString(),
        output: 'json'
      });
      
      const url = `/api/archive/advancedsearch.php?${params.toString()}`;

      console.log('Searching Internet Archive for:', query);
      console.log('Enhanced search query:', searchQuery);
      console.log('Full URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', response.status, response.statusText);
        console.error('Response body:', errorText);
        throw new Error(`Search failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
      }

      const responseText = await response.text();
      console.log('API Response received, length:', responseText.length);
      console.log('First 500 chars:', responseText.substring(0, 500));
      
      let data: ArchiveResponse;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Response that failed to parse:', responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}...`);
      }
      
      setResults(data.response.docs);
      setTotalResults(data.response.numFound);
      setCurrentPage(page);
      
      console.log(`Found ${data.response.numFound} results, showing ${data.response.docs.length}`);
      
    } catch (err) {
      console.error('Search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to search Internet Archive';
      setError(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchArchive(searchTerm, 1);
  };

  const handlePageChange = (newPage: number) => {
    searchArchive(searchTerm, newPage);
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="animate-fade-in min-h-screen pt-16">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Book className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            SDA Bible Commentary Search
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Search the Internet Archive for Seventh-day Adventist Bible Commentary materials and resources.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for Bible verses, books, or topics (e.g., 'Psalms 38:18', 'Genesis', 'prophecy')"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !searchTerm.trim()}
                className="px-6 py-3 bg-flame-600 hover:bg-flame-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span className="ml-2 hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Search Info */}
          {totalResults > 0 && (
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Found {totalResults.toLocaleString()} results for "{searchTerm}"
              {totalPages > 1 && (
                <span> (Page {currentPage} of {totalPages})</span>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-red-800 dark:text-red-200 font-medium">Search Error</p>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-flame-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Searching Internet Archive...</p>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={result.identifier} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {result.title}
                      </h3>
                      
                      {result.creator && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <strong>Creator:</strong> {result.creator}
                        </p>
                      )}
                      
                      {result.date && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <strong>Date:</strong> {result.date}
                        </p>
                      )}
                      
                      {result.description && (
                        <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                          {result.description.length > 300 
                            ? `${result.description.substring(0, 300)}...` 
                            : result.description}
                        </p>
                      )}
                      
                      {result.subject && result.subject.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            <strong>Subjects:</strong>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {result.subject.slice(0, 5).map((subject, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-2 py-1 rounded-full"
                              >
                                {subject}
                              </span>
                            ))}
                            {result.subject.length > 5 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{result.subject.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {result.format && result.format.length > 0 && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <strong>Formats:</strong> {result.format.join(', ')}
                        </p>
                      )}
                      
                      {result.downloads && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <strong>Downloads:</strong> {result.downloads.toLocaleString()}
                        </p>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={`https://archive.org/details/${result.identifier}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-lg transition-colors duration-200"
                      >
                        View
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-gray-600 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && searchTerm && results.length === 0 && !error && (
            <div className="text-center py-12">
              <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try different keywords or check your spelling.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* API Information */}
      <section className="py-8 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/50">
            <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-4">
              About This Search & Troubleshooting
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>
                This search is restricted to ONLY SDA Bible Commentary materials from the Internet Archive.
                It searches within the "SdaBibleCommentary1980" collection which contains:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SDA Bible Commentary volumes (Vol. 1-10)</li>
                <li>Bible Student's Source Book</li>
                <li>SDA Bible Dictionary</li>
                <li>Other official SDA Bible study materials</li>
              </ul>
              <p className="mt-4">
                <strong>Collection:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">SdaBibleCommentary1980</code><br/>
                <strong>API Endpoint:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">archive.org/advancedsearch.php</code>
              </p>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">Bible Verse Search Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                  <li>Use format like "Psalms 38:18" or "Genesis 1:1"</li>
                  <li>Try variations like "Psalm 38" for chapter commentary</li>
                  <li>Search book names like "Daniel" or "Revelation"</li>
                  <li>Use topics like "prophecy", "sanctuary", "second coming"</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">Troubleshooting:</p>
                <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-300">
                  <li>If you see CORS errors, the browser is blocking cross-origin requests</li>
                  <li>Check the browser console (F12) for detailed error messages</li>
                  <li>Try simple search terms like "Psalms 38:18" or "Daniel" first</li>
                  <li>The Internet Archive API is public and doesn't require API keys</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SDACommentarySearch;