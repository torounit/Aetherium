import moment from 'moment/moment';

export const date = async ( { state } ) => {
	const year = state.route.params.year;
	const monthnum = state.route.params.monthnum || '01';
	const day = state.route.params.day || '01';

	const first = `${ year }-${ monthnum }-${ day }T00:00:00`;
	const last = moment( `${ year }-${ monthnum }-${ day }` ).endOf( 'year' ).format( 'YYYY-MM-DDTHH:mm:ss' );
	const posts = await getPosts( createPostsArguments( state, { after: first, before: last } ) );
	const queriedObject = {};
	return {
		queriedObject,
		posts,
		hasMore: getCollectionInstance( 'Posts' ).hasMore(),
	};
};

export const term = async ( { state } ) => {
	let posts = [];
	let queriedObject = {};
	const taxonomy = state.taxonomies[ state.route.name ];
	if ( taxonomy ) {
		const restBase = taxonomy.rest_base;
		const Collection = wp.api.getCollectionByRoute( `/wp/v2/${ restBase }` );
		const key = taxonomy.slug;
		const slugs = state.route.params[ key ].split( '/' );
		const slug = slugs.pop();
		const terms = await( new Collection() ).fetch( { data: { slug: slug } } );
		queriedObject = terms[ 0 ];
		posts = await getPosts( createPostsArguments( state, { [ restBase ]: queriedObject.id } ) );
		return {
			queriedObject,
			posts,
			hasMore: getCollectionInstance( 'Posts' ).hasMore(),
		};
	}
	return {
		queriedObject: {},
		posts: {},
		hasMore: false,
	};
};

export const home = async ( { state } ) => {
	let queriedObject = {};
	if ( global.themeSettings.pageOnFront ) {
		queriedObject = await getPost( global.themeSettings.pageForPosts, 'Page' );
	}
	const posts = await getPosts( createPostsArguments( state ) );
	return {
		queriedObject,
		posts,
		hasMore: getCollectionInstance( 'Posts' ).hasMore(),
	};
};

export const author = async ( { state } ) => {
	const queriedObject = await getUserbySlug( state.route.params.author );
	const posts = await getPosts( createPostsArguments( state, { author: queriedObject.id } ) );
	return {
		queriedObject,
		posts,
		hasMore: getCollectionInstance( 'Posts' ).hasMore(),
	};
};

export const singular = async ( { state } ) => {
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
					const pagenames = state.route.params.pagename.split( '/' );
					const pagename = pagenames.pop();
					posts = await getPosts( { slug: pagename }, 'Pages' );
					if ( 0 < posts.length ) {
						queriedObject = posts[ 0 ];
						break;
					}
					if ( ! global.themeSettings.useVerbosePageRules ) {
						break;
					}
				}

			// if not found page, search post.
			case 'post': {
				if ( state.route.params.postname || state.route.params.pagename ) {
					posts = await getPosts( { slug: state.route.params.postname || state.route.params.pagename } );
					if ( 0 < posts.length ) {
						queriedObject = posts[ 0 ];
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
		hasMore: false,
	};
};

const getUserbySlug = async ( slug ) => {
	const users = await( new wp.api.collections.Users() ).fetch( { data: { slug: slug } } );
	if ( users[ 0 ] ) {
		return users[ 0 ];
	}
	return {};
};

const getPost = async ( id, type = 'Post' ) => {
	const Model = wp.api.models[ type ];
	const model = new Model( { id: id } );
	return await model.fetch();
};

const instances = [];
const getCollectionInstance = ( type ) => {
	const create = () => {
		if ( instances[ type ] ) {
			return instances[ type ];
		}
		const Collection = wp.api.collections[ type ];
		instances[ type ] = new Collection();
		return instances[ type ];
	};
	return create();
};

const getPosts = async ( data, type = 'Posts' ) => {
	return await getCollectionInstance( type ).fetch( { data: data } );
};

const createPostsArguments = ( state, param = {} ) => {
	const page = state.route.params.page || 1;
	const perPage = global.themeSettings.postsPerPage;
	const data = {
		page: page,
		per_page: perPage,
	};
	return Object.assign( data, param );
};
