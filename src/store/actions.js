import types from './mutation-types';
import moment from 'moment';

export const initialize = async({ commit, state }) => {
	await fetchSiteOption({ commit, state });
	await fetchTypes({ commit, state });
	await fetchTaxonomies({ commit, state });
	await fetchPosts({ commit, state });
};

export const fetchSiteOption = async({ commit }) => {
	let response = await fetch( global.wpApiSettings.root );
	let data = await response.json();
	commit( types.SET_SITE_OPTION, data );
};

export const fetchTypes = async({ commit }) => {
	let postTypes = await( new wp.api.collections.Types() ).fetch();
	commit( types.SET_POST_TYPES, postTypes );
};

export const fetchTaxonomies = async({ commit }) => {
	let taxnomies = await( new wp.api.collections.Taxonomies() ).fetch();
	commit( types.SET_TAXONOMIES, taxnomies );
};

export const fetchPosts = async({ commit, state }) => {
	let result = {
		queriedObject: {},
		hasMore: false,
		posts: []
	};

	let routeName = state.route.name;
	if ([ 'day', 'month', 'year' ].includes( routeName ) ) {
		result = await dateArchivePosts({ state });
	} else if ([ 'home' ].includes( routeName ) ) {
		result = await homePosts({ state });
	} else if ( Object.keys( state.taxonomies ).includes( routeName ) ) {
		result = await taxonomyArchivePosts({ state, taxonomyName: routeName });
	} else if ([ 'author' ].includes( routeName ) ) {
		result = await authorArchivePosts({ commit, state });
	} else if ( state.route.query.preview || [ 'front-page', 'page', 'post' ].includes( routeName ) ) {
		result =  await singularPost({ state });
	}

	commit( types.SET_QUERIED_OBJECT, result.queriedObject );
	commit( types.SET_HASMORE, result.hasMore );
	commit( types.SET_POSTS, result.posts );
	commit( types.SET_TEMPLATE_TYPE );

};

const dateArchivePosts = async({ state }) => {
	let postsCollection = new wp.api.collections.Posts();
	let posts = [];
	let queriedObject = {};
	let page = state.route.params.page || 1;
	let data = { page: page };

	let year = '';
	let monthnum = '01';
	let day = '01';

	switch ( state.route.name ) {
		case 'day': {
			day = state.route.params.day;
		}
		case 'month': {
			monthnum = state.route.params.monthnum;
		}
		case 'year': {
			year = state.route.params.year;
			let first = `${year}-${monthnum}-${day}T00:00:00`;
			let last = moment( `${year}-${monthnum}-${day}` ).endOf( 'year' ).format( 'YYYY-MM-DDTHH:mm:ss' );
			data = Object.assign( data, { after: first, before: last });
			posts = await postsCollection.fetch({ data: data });
		}
	}

	return {
		queriedObject,
		posts,
		hasMore: postsCollection.hasMore()
	};
};

const taxonomyArchivePosts = async({ state }) => {
	let postsCollection = new wp.api.collections.Posts();
	let posts = [];
	let queriedObject = {};
	let page = state.route.params.page || 1;
	let data = { page: page };

	let taxonomy = state.taxonomies[state.route.name];
	if ( taxonomy ) {
		let restBase = taxonomy.rest_base;
		let Collection = wp.api.getCollectionByRoute( `/wp/v2/${restBase}` );
		let key = taxonomy.slug;
		let slugs = state.route.params[key].split( '/' );
		let slug = slugs.pop();
		let terms = await( new Collection() ).fetch({ data: { slug: slug } });
		queriedObject = terms[0];

		data[restBase] = queriedObject.id;
		posts = await postsCollection.fetch({ data: data });
	}

	return {
		queriedObject,
		posts,
		hasMore: postsCollection.hasMore()
	};

};

const homePosts = async({ state }) => {
	let postsCollection = new wp.api.collections.Posts();
	let page = state.route.params.page || 1;
	let data = { page: page };

	let posts = await postsCollection.fetch({ data: data });

	let queriedObject = {};
	if ( global.themeSettings.pageOnFront ) {
		let model = new wp.api.models.Page({ id: global.themeSettings.pageForPosts });
		queriedObject = await model.fetch();
	}
	return {
		queriedObject,
		posts,
		hasMore: postsCollection.hasMore()
	};
};

const authorArchivePosts = async({ state }) => {
	let postsCollection = new wp.api.collections.Posts();
	let page = state.route.params.page || 1;
	let data = { page: page };
	let users = await( new wp.api.collections.Users() ).fetch({ data: { slug: state.route.params.author } });
	let queriedObject = users[0];
	data = Object.assign( data, { author: queriedObject.id });
	let posts = await postsCollection.fetch({ data: data });

	return {
		queriedObject,
		posts,
		hasMore: postsCollection.hasMore()
	};

};


const singularPost = async({ state }) => {
	let postsCollection = new wp.api.collections.Posts();
	let posts = [];
	let queriedObject = {};

	// for singular
	if ( state.route.query.preview ) {
		if ( state.route.query.preview_id ) {
			let model = new wp.api.models.Post({ id: state.route.query.preview_id });
			queriedObject = await model.fetch();
			posts = [ queriedObject ];
		} else if ( state.route.query.p ) {
			let model = new wp.api.models.Post({ id: state.route.query.p });
			queriedObject = await model.fetch();
			posts = [ queriedObject ];
		} else if ( state.route.query.page_id ) {
			let model = new wp.api.models.Page({ id: state.route.query.page_id });
			queriedObject = await model.fetch();
			posts = [ queriedObject ];
		}
	} else {

		// for singular
		switch ( state.route.name ) {
			case 'front-page': {
				let model = new wp.api.models.Page({ id: global.themeSettings.pageOnFront });
				queriedObject = await model.fetch();
				posts = [ queriedObject ];
				break;
			}

			case 'page':
				let pagesCollection = new wp.api.collections.Pages();
				let pagenames = [];
				if ( state.route.params.pagename ) {
					pagenames = state.route.params.pagename.split( '/' );
					let pagename = pagenames.pop();
					posts = await pagesCollection.fetch({ data: { slug: pagename } });
					if ( 0 < posts.length ) {
						queriedObject = posts[0];
						break;
					}

					if ( ! global.themeSettings.useVerbosePageRules ) {
						break;
					}
				}

			case 'post': {
				if ( state.route.params.postname || state.route.params.pagename ) {
					posts = await postsCollection.fetch({
						data: {
							slug: state.route.params.postname || state.route.params.pagename
						}
					});
					if ( 0 < posts.length ) {
						queriedObject = posts[0];
					}
				} else {
					let model = new wp.api.models.Post({ id: state.route.params.post_id });
					queriedObject = await model.fetch();
					posts = [ queriedObject ];
				}

				break;
			}
		}
	}
	return {
		queriedObject,
		posts,
		hasMore: false
	};
};


