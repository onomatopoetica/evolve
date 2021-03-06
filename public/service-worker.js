let cache_name = "EvolveAppSW";

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_name).then((cache) => {
        console.log('Install!');
        return cache.addAll([
          '/login.html',
          '/signup.html',
          '/assets/icon.png',
          '/assets/icon.jpg',
          // '/css/entry.png',
          // '/css/evolve.png',
          // '/css/journal.png',
          '/css/StairsLogo.png',
          '/css/style.css',
          '/js/entries.js',
          '/js/exercise.js',
          '/js/journal.js',
          '/js/login.js',
          '/js/members.js',
          '/js/signup.js',
          '/stylesheets/style.css',
          '/entries.html',
          '/exercise.html',
          '/favicon.ico',
          '/journal.html',
          '/manifest.json',
          '/members.html'
          // '/.html'
          
         ])
         .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", event => {
  console.log('Activate!');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
          console.log('Fetching resource: '+event.request.url);
      return res || fetch(event.request).then((response) => {
                return caches.open(cache_name).then((cache) => {
          console.log('Caching new resource: '+event.request.url);
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

