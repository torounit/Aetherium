importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js' );
workbox.core.setCacheNameDetails( {
	prefix: 'aetherium-wp',
	suffix: 'v1'
} );

workbox.precaching.precacheAndRoute( [
	{ url: '/', revision: '0.0.1' },
	{ url: '/?manifest', revision: '0.0.1' }
] );

const PRE_CACHE_ASSETS = JSON.parse( '<?php echo json_encode( get_option( 'aetherium_assets', [] ) ); ?>' );
workbox.precaching.precacheAndRoute( PRE_CACHE_ASSETS );


workbox.routing.registerNavigationRoute( '/', {
	blacklist: [
		new RegExp( '.*wp-admin.*' ),
		new RegExp( '.*wp-login.*' ),
		new RegExp( '.*wp-json.*' ),
		new RegExp( '.*customize_changeset_uuid.*' ),
		new RegExp( '.*preview.*' )
	]
} );

workbox.routing.registerRoute(
	new RegExp( '.*/wp-json/.*' ),
	workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
	// Cache image files
	/.*\.(?:png|jpg|jpeg|svg|gif)/,

	// Use the cache if it's available
	workbox.strategies.cacheFirst( {
		cacheName: 'image-cache',
		plugins: [
			new workbox.expiration.Plugin( {
				// Cache only 20 images
				maxEntries: 50,
				// Cache for a maximum of 3 days
				maxAgeSeconds: 3 * 24 * 60 * 60
			} )
		]
	} )
);

// fallback navigate
workbox.routing.registerRoute(
	( { event } ) => {
		let destinations = ['audio', 'audioworklet', 'embed', 'font', 'image', 'manifest', 'object', 'paintworklet', 'report', 'script', 'serviceworker', 'sharedworker', 'style', 'track', 'video', 'worker', 'xslt'];
		let blacklist = ['wp-json', 'wp-admin', 'wp-login', 'preview', 'customize_changeset_uuid'];
		return 'navigate' === event.request.mode &&
			-1 === destinations.indexOf( event.request.destination ) &&
			blacklist.every( ( word ) => -1 === event.request.url.indexOf( word ) );
	},
	( { event } ) => {
		return workbox.strategies.cacheFirst()
			.handle( { event } )
			.catch( () => caches.match( '/' ).then( ( response ) => response ) );
	}
);
