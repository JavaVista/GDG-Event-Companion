const CACHE_NAME = 'gdg-companion-pwa-v2';
const DYNAMIC_CACHE_NAME = 'gdg-companion-dynamic-v2';

// Static assets to precache during install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './events/',
  './more/',
  './organizer/dashboard/',
  './organizer/intro/',
  './organizer/outro/',
  './organizer/theme/',
  './qr/',
  './offline/',
  './site.webmanifest',
  './manifest.json',
  './favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-maskable-512.png',
  './images/gdg-logo.png',
  './images/orlando-skyline.png',
  './screenshots/desktop.png',
  './screenshots/mobile.png',
  './screenshots/shortcut-events.png',
  './screenshots/shortcut-organizer.png',
];

// Install Event - Precache App Shell resiliently
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        console.log('[Service Worker] Precaching app shell assets');
        await Promise.allSettled(
          PRECACHE_ASSETS.map((asset) =>
            cache.add(asset).catch((err) => {
              console.warn('[Service Worker] Failed to cache:', asset, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
              console.log('[Service Worker] Removing old cache:', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event - Handle Caching & Offline Fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET, browser extension (chrome-extension://), and non-http/https requests
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Strategy 1: HTML Navigation -> Network First, Cache Fallback, Offline Page Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          // Try exact match or offline page fallback
          const offlinePage =
            (await caches.match('./offline/')) ||
            (await caches.match('./offline')) ||
            (await caches.match('./offline/index.html'));
          return (
            offlinePage ||
            new Response('Offline', { status: 503, statusText: 'Offline' })
          );
        })
    );
    return;
  }

  // Strategy 2: Bevy API & External Data Requests -> Network First, Cache Fallback
  if (url.hostname.includes('bevy') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Strategy 3: Static Assets (JS, CSS, Images, Fonts) -> Cache First, Network Fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Return empty response for missing images gracefully
          return new Response('', { status: 404, statusText: 'Not Found' });
        });
    })
  );
});
