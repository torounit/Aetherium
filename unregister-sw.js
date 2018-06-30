if ( 'serviceWorker' in navigator ) {
	navigator.serviceWorker.getRegistrations().then( registrations => {
		for ( let registration of registrations ) {
			registration.unregister();
		}
	});
	caches.keys().then( keys => {
		let promises = [];
		keys.forEach( function( cacheName ) {
			if ( cacheName ) {
				promises.push( caches.delete( cacheName ) );
			}
		});
	});
}
