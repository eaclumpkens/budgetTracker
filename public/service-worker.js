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
