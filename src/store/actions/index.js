import types from '../mutation-types';
import * as query from './query.js';

export const initialize = async ( { commit, state } ) => {
	await fetchSiteOption( { commit, state } );
	await fetchTypes( { commit, state } );
	await fetchTaxonomies( { commit, state } );
	await fetchPosts( { commit, state } );
};

export const fetchSiteOption = async ( { commit } ) => {
	const response = await fetch( global.wpApiSettings.root );
	const data = await response.json();
	commit( types.SET_SITE_OPTION, data );
};

export const fetchTypes = async ( { commit } ) => {
	const postTypes = await( new wp.api.collections.Types() ).fetch();
	commit( types.SET_POST_TYPES, postTypes );
};

export const fetchTaxonomies = async ( { commit } ) => {
	const taxnomies = await( new wp.api.collections.Taxonomies() ).fetch();
	commit( types.SET_TAXONOMIES, taxnomies );
};

export const fetchPosts = async ( { commit, state } ) => {
	let result = {
		queriedObject: {},
		hasMore: false,
		posts: [],
	};

	const routeName = state.route.name;
	if ( [ 'day', 'month', 'year' ].includes( routeName ) ) {
		result = await query.date( { state } );
	} else if ( [ 'home' ].includes( routeName ) ) {
		result = await query.home( { state } );
	} else if ( Object.keys( state.taxonomies ).includes( routeName ) ) {
		result = await query.term( { state, taxonomyName: routeName } );
	} else if ( [ 'author' ].includes( routeName ) ) {
		result = await query.author( { commit, state } );
	} else if ( state.route.query.preview || [ 'front-page', 'page', 'post' ].includes( routeName ) ) {
		result = await query.singular( { state } );
	}

	commit( types.SET_QUERIED_OBJECT, result.queriedObject );
	commit( types.SET_HASMORE, result.hasMore );
	commit( types.SET_POSTS, result.posts );
	commit( types.SET_TEMPLATE_TYPE );
};

