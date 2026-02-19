// Vercel serverless function to proxy Bible API requests
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;
  
  // Get API key from environment variable
  const apiKey = process.env.BIBLE_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Bible API key not configured on server' 
    });
  }

  const bibleId = 'de4e12af7f28f599-02'; // ESV
  const baseUrl = 'https://api.scripture.api.bible/v1';
  
  try {
    let apiUrl;
    
    if (endpoint.startsWith('passages/')) {
      const reference = endpoint.replace('passages/', '');
      apiUrl = `${baseUrl}/bibles/${bibleId}/passages/${encodeURIComponent(reference)}?content-type=html&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`;
    } else if (endpoint.startsWith('verses/')) {
      const reference = endpoint.replace('verses/', '');
      apiUrl = `${baseUrl}/bibles/${bibleId}/verses/${encodeURIComponent(reference)}?content-type=html&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`;
    } else if (endpoint.startsWith('search')) {
      const query = req.query.query;
      const limit = req.query.limit || 10;
      apiUrl = `${baseUrl}/bibles/${bibleId}/search?query=${encodeURIComponent(query)}&limit=${limit}`;
    } else if (endpoint === 'books') {
      apiUrl = `${baseUrl}/bibles/${bibleId}/books`;
    } else {
      return res.status(404).json({ error: 'Endpoint not found' });
    }

    console.log('Proxying request to:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'api-key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bible API error:', response.status, errorText);
      
      let errorMessage = `Bible API request failed: ${response.status}`;
      
      if (response.status === 401) {
        errorMessage = 'Invalid Bible API key configuration';
      } else if (response.status === 404) {
        errorMessage = 'Bible verse or passage not found';
      } else if (response.status === 429) {
        errorMessage = 'Too many requests to Bible API';
      }
      
      return res.status(response.status).json({ error: errorMessage });
    }

    const data = await response.json();
    
    // Clean and format the content
    if (data.data && data.data.content) {
      data.data.content = cleanAndFormatVerse(data.data.content);
    }
    
    res.status(200).json(data.data);
  } catch (error) {
    console.error('Bible API proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch Bible content' 
    });
  }
}

function cleanAndFormatVerse(content) {
  if (!content || typeof content !== 'string') {
    return '';
  }

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
}