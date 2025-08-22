const CACHE_NAME = 'ecode-halal-check-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/manifest.json',
    '/robots.txt',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
    '/icon.svg',
    '/logo.webp',
    '/banner.svg'
];

// Cache strategies
const CACHE_STRATEGIES = {
    networkFirst: ['/api/', '/ecode/'],
    cacheFirst: ['.js', '.css', '.woff2', '.woff', '.ttf', '.webp', '.png', '.jpg', '.svg'],
    staleWhileRevalidate: ['/index.html', '/']
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Determine cache strategy based on request URL
function getCacheStrategy(url) {
    for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
        if (patterns.some(pattern => url.includes(pattern))) {
            return strategy;
        }
    }
    return 'networkFirst';
}

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    const strategy = getCacheStrategy(url);

    if (strategy === 'cacheFirst') {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((fetchResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    } else if (strategy === 'staleWhileRevalidate') {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                    });
                    return networkResponse;
                });
                return cachedResponse || fetchPromise;
            })
        );
    } else {
        // networkFirst (default)
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
    }
});

// Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 