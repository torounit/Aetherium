export const title = ( state ) => {
	let qm = state.queriedObject;
	if ( qm.name ) {
		return qm.name;
	};
	if ( qm.title && qm.title.rendered ) {
		return qm.title.rendered;
	};
	if ( !! qm  && 'home' === state.route.name ) {
		return state.siteOption.name;
	};

	return '';
};
