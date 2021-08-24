'use strict';
// self.addEventListener('install', () => {});
const cacheName = 'CashMemory';

// self.addEventListener('install', function(event) {
//     event.waitUntil(
//       caches.open(cacheName).then(function(cache) {
//         return cache.addAll(
//           [
//             '/js/kontakt.js',
//             '/js/kupovina.js',
//             '/css/style.css',
//             '/script.js',
//             '/fantastika.html',
//             '/galerija.html',
//             '/index.html',
//             '/klasici.html',
//             '/kontakt.html',
//             '/kupovina.html',
//             '/ljubavni.html',
//             '/onama.html',
//             '/triler.html'
//           ]
//         );
//       })
//     );
//   });

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll([
                    '/js/kontakt.js',
                    '/js/kupovina.js',
                    '/css/style.css',
                    '/script.js',
                    '/fantastika.html',
                    '/galerija.html',
                    '/index.html',
                    '/klasici.html',
                    '/kontakt.html',
                    '/kupovina.html',
                    '/ljubavni.html',
                    '/onama.html',
                    '/triler.html'
                  ]);
    })());
  });
     
// self.addEventListener('fetch', () => {});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });

self.addEventListener('push', function (event) {
    console.log('Received push');
    var notificationTitle = 'New notificaton';
    var notificationOptions = {
        body: 'Thanks for sending this push msg.',
        icon: 'icon',
        badge: 'badge',
        tag: 'simple-push-demo-notification',
        data: {
            url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/'
        }
    };

    if (event.data) {
        var dataText = event.data.text();
        const obj = JSON.parse(dataText)
        notificationTitle = 'Received Payload';
        notificationOptions.body = `Push data: ${obj.data || 'no-data'}`;
    }

    event.waitUntil(Promise.all([self.registration.showNotification(notificationTitle, notificationOptions)]));
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (event.notification.data && event.notification.data.url) {
        clients.openWindow(event.notification.data.url);
    }
});