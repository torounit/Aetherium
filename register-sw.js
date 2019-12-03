if ( window.navigator && navigator.serviceWorker ) {
	navigator.serviceWorker.getRegistrations().then( ( registrations ) => {
		for ( const registration of registrations ) {
			registration.unregister();
		}
	} );
}
