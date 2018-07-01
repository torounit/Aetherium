import moment from 'moment/moment';

export const date = async({ state }) => {

	let year = state.route.params.year;
	let monthnum = state.route.params.monthnum || '01';
	let day = state.route.params.day || '01';

	let first = `${year}-${monthnum}-${day}T00:00:00`;
	let last = moment( `${year}-${monthnum}-${day}` ).endOf( 'year' ).format( 'YYYY-MM-DDTHH:mm:ss' );
	let posts = await getPosts( createPostsArguments( state, { after: first, before: last }) );
	let queriedObject = {};
	return {
		queriedObject,
		posts,
		hasMore: getCollectionInstance( 'Posts' ).hasMore()
	};
};

export const term = async({ state }) => {
	let posts = [];
	let queriedObject = {};
	let taxonomy = state.taxonomies[state.route.name];
	if ( taxonomy ) {
		let restBase = taxonomy.rest_base;
		let Collection = wp.api.getCollectionByRoute( `/wp/v2/${restBase}` );
		let key = taxonomy.slug;
		let slugs = state.route.params[key].split( '/' );
		let slug = slugs.pop();
		let terms = await( new Collection() ).fetch({ data: { slug: slug } });
		queriedObject = terms[0];
		posts = await getPosts( createPostsArguments( state, { [restBase]: queriedObject.id }) );
		return {
			queriedObject,
			posts,
			hasMore: getCollectionInstance( 'Posts' ).hasMore()
		};
	}
	return {
		queriedObject: {},
		posts: {},
		hasMore: false
	};

};

export const home = async({ state }) => {
	let queriedObject = {};
	if ( global.themeSettings.pageOnFront ) {
		queriedObject = await getPost( global.themeSettings.pageForPosts, 'Page' );
	}
	let posts = await getPosts( createPostsArguments( state ) );
	return {
		queriedObject,
		posts,
		hasMore: getCollectionInstance( 'Posts' ).hasMore()
	};
};

export const author = async({ state }) => {
	let queriedObject = await getUserbySlug( state.route.params.author );
	let posts = await getPosts( createPostsArguments( state, { author: queriedObject.id }) );
	return {
		queriedObject,
		posts,
		hasMore: getCollectionInstance( 'Posts' ).hasMore()
	};

};

export const singular = async({ state }) => {
	let posts = [];
	let queriedObject = {};

	// for singular
	if ( state.route.query.preview ) {
		if ( state.route.query.preview_id ) {
			queriedObject = await getPost( state.route.query.preview_id );
			posts = [ queriedObject ];
		} else if ( state.route.query.p ) {
			queriedObject = await getPost( state.route.query.p );
			posts = [ queriedObject ];
		} else if ( state.route.query.page_id ) {
			queriedObject = await getPost( state.route.query.page_id, 'Page' );
			posts = [ queriedObject ];
		}
	} else {

		// for singular
		// noinspection FallThroughInSwitchStatementJS
		switch ( state.route.name ) {
			case 'front-page': {
				queriedObject = await getPost( global.themeSettings.pageOnFront, 'Page' );
				posts = [ queriedObject ];
				break;
			}

			case 'page':
				if ( state.route.params.pagename ) {
					let pagenames = state.route.params.pagename.split( '/' );
					let pagename = pagenames.pop();
					posts = await getPosts({ slug: pagename }, 'Pages' );
					if ( 0 < posts.length ) {
						queriedObject = posts[0];
						break;
					}
					if ( ! global.themeSettings.useVerbosePageRules ) {
						break;
					}
				}

			// if not found page, search post.
			case 'post': {
				if ( state.route.params.postname || state.route.params.pagename ) {
					posts = await getPosts({ slug: state.route.params.postname || state.route.params.pagename });
					if ( 0 < posts.length ) {
						queriedObject = posts[0];
					}
				} else {
					queriedObject = await getPost( state.route.params.post_id, 'Post' );
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

const getUserbySlug = async( slug ) => {
	let users = await( new wp.api.collections.Users() ).fetch({ data: { slug: slug } });
	if ( users[0]) {
		return users[0];
	}
	return {};
};


const getPost = async( id, type = 'Post' ) => {
	let Model = wp.api.models[type];
	let model = new Model({ id: id });
	return await model.fetch();
};

let instances = [];
const getCollectionInstance = ( type ) => {
	let create = () => {
		if ( instances[type]) {
			return instances[type];
		}
		let Collection = wp.api.collections[type];
		instances[type] = new Collection();
		return instances[type];
	};
	return create();
};


const getPosts = async( data, type = 'Posts' ) => {
	return await getCollectionInstance( type ).fetch({ data: data });
};

const createPostsArguments = ( state, param = {}) => {
	let page = state.route.params.page || 1;
	let perPage = global.themeSettings.postsPerPage
	let data = {
		page: page,
		per_page: perPage
	};
	return Object.assign( data, param );
};
