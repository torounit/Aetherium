importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js' );
workbox.core.setCacheNameDetails( {
  prefix: 'vue-spa-wp',
  suffix: 'v1',
} );


workbox.precaching.precacheAndRoute( [
  { url: '/', revision: '0.0.1' },
  { url: '/wp-includes/js/jquery/jquery.js?ver=1.12.4', revision: '1.12.4' },
  { url: '/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1', revision: '1.4.1' },
  { url: '/wp-includes/js/underscore.min.js?ver=1.8.3', revision: '1.8.3' },
  { url: '/wp-includes/js/backbone.min.js?ver=1.2.3', revision: '1.2.3' },
  { url: '/wp-includes/js/api-request.min.js?ver=4.9.5', revision: '4.9.5' },
  { url: '/wp-includes/js/wp-api.min.js?ver=4.9.5', revision: '4.9.5' },
  { url: '/wp-includes/js/wp-embed.min.js?ver=4.9.5', revision: '4.9.5' },
] );


//fallback navigate
workbox.routing.registerRoute(
  ( { event } ) => {
    return event.request.mode === 'navigate';
  },
  ( { event } ) => {
    return workbox.strategies.cacheFirst()
      .handle( { event } )
      .catch( () => caches.match( '/' ).then( ( response ) => response ) );
  }
);


workbox.routing.registerRoute(
  /\/wp-json\.*/,
  workbox.strategies.networkFirst()
);


workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.(?:css|js)/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate( {} )
);


workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst( {
    plugins: [
      new workbox.expiration.Plugin( {
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      } )
    ],
  } )
);

