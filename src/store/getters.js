import pathToRegexp from 'path-to-regexp';


export default {
	parsedQuery( state ) {
		let path =  state.route.path;
		console.log(state.route.path);
		let vars = null;
		let query = global.themeSettings.permastructs.find( function( struct ) {
			console.log(struct)
			let re = pathToRegexp( struct.path )
			vars = re.exec(path)
			return vars;
		} );

		return {
			matched: query,
			vars: vars
		}
	}
}
