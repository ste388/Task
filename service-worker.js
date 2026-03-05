const CACHE_NAME = 'pratiche-comune-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icons/192.png',
  './icons/512.png'
];

// Installazione e creazione della Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta con successo');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste di rete e serve i file dalla cache se disponibili
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Ritorna la risposta dalla cache se c'è, altrimenti fa la richiesta in rete
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Pulizia delle vecchie cache quando c'è una nuova versione
self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
