// Paslios Service Worker - Basic Offline Support
const CACHE_NAME = 'paslios-v1.0.0';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/home.html',
  '/register.html',
  '/profile.html',
  '/matches.html',
  '/messages.html',
  '/css/responsive.css',
  '/output.css',
  '/js/data.js',
  '/js/toast.js',
  '/js/mobile-ux.js',
  '/js/ux-enhancer.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then(fetchResponse => {
            // Cache successful GET requests
            if (event.request.method === 'GET' && fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return fetchResponse;
          })
          .catch(() => {
            // Offline fallback for HTML pages
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Offline fallback for images
            if (event.request.destination === 'image') {
              return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" fill="#999">Resim yüklenemedi</text></svg>', {
                headers: { 'Content-Type': 'image/svg+xml' }
              });
            }
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Process offline actions when back online
function doBackgroundSync() {
  return new Promise((resolve) => {
    // Check for pending actions in localStorage
    const pendingActions = JSON.parse(localStorage.getItem('pendingActions') || '[]');
    
    if (pendingActions.length > 0) {
      console.log('Processing offline actions:', pendingActions.length);
      
      // Process each pending action
      pendingActions.forEach(action => {
        // Simulate API call
        console.log('Processing action:', action);
      });
      
      // Clear pending actions
      localStorage.removeItem('pendingActions');
    }
    
    resolve();
  });
}
