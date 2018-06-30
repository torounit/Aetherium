import moment from 'moment';

export default {
	install( Vue, options ) {
		Vue.filter( 'path', ( url ) => {
			if ( ! url ) {
				return '';
			}
			let link = document.createElement( 'a' );
			link.href = url;
			return link.href.replace( link.origin, '' );
		});

		Vue.filter( 'dateFormat', ( string, format = 'YYYY/MM/DD' ) => {
			return moment( string ).format( format );
		});
	}
};

