importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'vue-spa',
  suffix: 'v1',
  precache: 'wp-precache',
  runtime: 'wp-runtime'
});

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '0.1.3' },
]);

workbox.routing.registerRoute(
  /\/wp-json\.*/,
  workbox.strategies.networkFirst()
);


workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.(?:css|js)/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({})
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
