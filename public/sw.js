const CACHE_NAME = 'shame-to-flame-v4';
const STATIC_CACHE = 'shame-to-flame-static-v4';
const DYNAMIC_CACHE = 'shame-to-flame-dynamic-v4';
const CRISIS_CACHE = 'shame-to-flame-crisis-v2';

// Core files to cache immediately
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/flame-icon.svg',
  '/shame-to-flame.mp4'
];

// Crisis resources - ALWAYS cached automatically
const CRISIS_ASSETS = [
  '/crisis-help',
  '/crisis-resources.json'
];

// Install event - cache core assets and crisis resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE)
        .then((cache) => {
          console.log('Service Worker: Caching core assets');
          return cache.addAll(CORE_ASSETS);
        }),
      caches.open(CRISIS_CACHE)
        .then((cache) => {
          console.log('Service Worker: Caching crisis resources (CRITICAL)');
          return cache.addAll(CRISIS_ASSETS);
        })
    ])
      .then(() => {
        console.log('Service Worker: All critical assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CRISIS_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (like Bible API)
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('Service Worker: Caching new resource', request.url);
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.log('Service Worker: Network request failed', error);
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/');
            }
            
            // For other requests, you could return a default offline asset
            return new Response('Offline - Please check your connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for offline submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-submissions') {
    event.waitUntil(
      syncOfflineSubmissions()
    );
  }
});

async function syncOfflineSubmissions() {
  console.log('Service Worker: Syncing offline submissions');

  try {
    const clients = await self.clients.matchAll({ type: 'window' });
    if (clients.length > 0) {
      clients[0].postMessage({
        type: 'SYNC_SUBMISSIONS'
      });
    }
  } catch (error) {
    console.error('Service Worker: Failed to sync submissions', error);
  }
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/flame-icon.svg',
      badge: '/flame-icon.svg',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/'
      },
      actions: [
        {
          action: 'open',
          title: 'Open',
          icon: '/flame-icon.svg'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Shame to Flame', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Handle messages from client for caching
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    const cacheName = event.data.cacheName || DYNAMIC_CACHE;

    event.waitUntil(
      caches.open(cacheName)
        .then((cache) => {
          console.log('Service Worker: Caching requested URLs', urls);
          return cache.addAll(urls);
        })
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          console.error('Service Worker: Failed to cache URLs', error);
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }
});