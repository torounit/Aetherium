importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');



workbox.core.setCacheNameDetails({
  prefix: 'vue-spa',
  suffix: 'v1',
  precache: 'theme-precache',
  runtime: 'theme-runtime'
});

workbox.precaching.precacheAndRoute([
  { url: './dist/main.bundle.js?ver=0.0.1', revision: '0.0.1' },
  { url: './dist/vendor.bundle.js?ver=0.0.1', revision: '0.0.1' },
  { url: './dist/main.css?ver=0.0.1', revision: '0.0.1' },
  { url: './dist/vendor.css?ver=0.0.1', revision: '0.0.1' },
]);
