const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/style.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

const CACHE_NAME = 'budget-cache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then((cache) => {
            console.log('Files succesfully cached.');
            cache.addAll(FILES_TO_CACHE);
        }).then(self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    const currentCaches = [CACHE_NAME, RUNTIME];
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return cacheNames.filter((cacheName) => !currentCaches.includes(cachename));
        })
        .then((cachesToDelete) => {
            return Promise.all(
                cachesTGoDelete.map((cacheToDelete) => {
                    return caches.delete(cacheToDelete);
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then((cache) => {
                    return fetch(event.request).then((response) => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        })
                    })
                })
            })
        )
    }
});
