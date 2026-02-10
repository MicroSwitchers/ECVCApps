// Service Worker for App Menu PWA
// Update this version string whenever you make changes to trigger cache refresh
const CACHE_VERSION = '2026.02.09.1';
const CACHE_NAME = `app-menu-v${CACHE_VERSION}`;
const urlsToCache = [
  './',
  './index.html',
  './switches.html',
  './manifest.json',
  './icon.svg',
  // Add critical images
  './cvicalc1.jpg',
  './cvicalc2.png',
  './agecalc.png',
  './endtimecalc.png',
  './mecbraille.jpg',
  './sixkey1.jpg',
  './sixkey.png',
  './brailleflex.jpg',
  // External resources
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache installation failed:', error);
        // Continue installation even if some resources fail to cache
        return caches.open(CACHE_NAME)
          .then((cache) => {
            // Cache essential files only
            const essentialFiles = ['./', './index.html', './manifest.json', './icon.svg'];
            return cache.addAll(essentialFiles);
          });
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Network-first for HTML documents (ensures fresh content)
  if (request.destination === 'document' || request.url.endsWith('.html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the fresh response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Offline - fall back to cache
          return caches.match(request).then((cached) => {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }
  
  // Cache-first for other assets (images, CSS, JS)
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        const fetchRequest = request.clone();
        
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          
          return response;
        }).catch(() => {
          // If fetch fails for document, return offline page
          if (request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Background sync for when the app comes back online
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Add any background sync logic here
  }
});

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('Push message received');
  // Add push notification logic here if needed
});

// Handle app shortcuts
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll().then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./index.html');
    })
  );
});
