let cache_name = "EvolveAppSW";



self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(cache_name).then(function(cache) {
     return cache.addAll([
      '/login.html',
      '/signup.html',
      // 'middleware/isAuthenticated.js',
      // 'config.json',
      // 'passport.js',
      // 'exercize.js',
      // 'index.js',
      // 'post.js',
      // 'user.js',
      // '/assets/icon.png',
      // '/assets/icon.jpg',
      // '/css/entry.png',
      // '/css/evolve.png',
      // '/css/journal.png',
      // '/css/StairsLogo.png',
      // '/css/style.css',
      // 'js/entries.js',
      // 'js/exercise.js',
      // 'js/journal.js',
      // 'js/login.js',
      // 'js/members.js',
      // 'js/signup.js',
      // 'stylesheets/style.css',
      // '/entries.html',
      // '/exercise.html',
      // '/favicon.ico',
      // '/journal.html',
      // '/login.html',
      // '/manifest.json',
      // '/members.html',
      // // '/.html',
      // 'routes/api-routes.js',
      // 'routes/exercise-api-routes.js',
      // 'routes/hmtl-routes.js',
      // 'routes/post-api-routes.js',
      // 'package-lock.json',
      // 'package.json',
      // 'server.js'
      
     ])
     .then(() => self.skipWaiting());
   })
 );
});

self.addEventListener('install', function(event) {
  console.log('Install!');
});
self.addEventListener("activate", event => {
  console.log('Activate!');
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

 