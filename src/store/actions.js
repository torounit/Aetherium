import types from './mutation-types'
import moment from 'moment'

export const initialize = async ( { commit, state } ) => {
	await fetchSiteOption( { commit, state } )
	await fetchTypes( { commit, state } )
	await fetchTaxonomies( { commit, state } )
	await fetchPosts( { commit, state } )
}

export const fetchSiteOption = async ( { commit } ) => {
	let response = await fetch( global.wpApiSettings.root )
	let data = await response.json()
	commit( types.SET_SITE_OPTION, data )
}

export const fetchTypes = async ( { commit } ) => {
	let postTypes = await ( new wp.api.collections.Types() ).fetch()
	commit( types.SET_POST_TYPES, postTypes )
}

export const fetchTaxonomies = async ( { commit } ) => {
	let taxnomies = await ( new wp.api.collections.Taxonomies() ).fetch()
	commit( types.SET_TAXONOMIES, taxnomies )
}

const dateArchivePosts = async ( { commit, state } ) => {
	let postsCollection = new wp.api.collections.Posts()
	let posts = []
	let queriedObject = {}
	let hasMore = false
	let page = state.route.params.page || 1
	let data = { page: page }

	let year = ''
	let monthnum = '01'
	let day = '01'

	switch ( state.route.name ) {
		case 'day': {
			day = state.route.params.day
		}
		case 'month': {
			monthnum = state.route.params.monthnum
		}
		case 'year': {
			year = state.route.params.year
			let first = `${year}-${monthnum}-${day}T00:00:00`
			let last = moment( `${year}-${monthnum}-${day}` ).endOf( 'year' ).format( 'YYYY-MM-DDTHH:mm:ss' )
			data = Object.assign( data, { after: first, before: last } )
			posts = await postsCollection.fetch( { data: data } )
			hasMore = postsCollection.hasMore()

			commit( types.SET_QUERIED_OBJECT, queriedObject )
			commit( types.SET_HASMORE, hasMore )
			commit( types.SET_POSTS, posts )

			return true
		}
	}

	return false
}

const taxonomyArchivePosts = async ( { commit, state } ) => {
	let postsCollection = new wp.api.collections.Posts()
	let posts = []
	let queriedObject = {}
	let hasMore = false
	let page = state.route.params.page || 1
	let data = { page: page }

	for ( let taxonomy in state.taxonomies ) {
		if ( state.route.name === taxonomy ) {
			let restBase = state.taxonomies[taxonomy].rest_base
			let Collection = wp.api.getCollectionByRoute( `/wp/v2/${restBase}` )
			let key = state.taxonomies[taxonomy].slug
			let slugs = []
			slugs = state.route.params[key].split( '/' )
			let slug = slugs.pop()
			let terms = await ( new Collection() ).fetch( { data: { slug: slug } } )
			queriedObject = terms[0]
			data[restBase] = queriedObject.id
			posts = await postsCollection.fetch( { data: data } )
			hasMore = postsCollection.hasMore()

			commit( types.SET_QUERIED_OBJECT, queriedObject )
			commit( types.SET_HASMORE, hasMore )
			commit( types.SET_POSTS, posts )

			return true
		}
	}
	return false
}

const homePosts = async ( { commit, state } ) => {
	let postsCollection = new wp.api.collections.Posts()
	let posts = []
	let page = state.route.params.page || 1
	let data = { page: page }

	if ( state.route.name === 'home' ) {
		posts = await postsCollection.fetch( { data: data } )
		commit( types.SET_QUERIED_OBJECT, {} )
		commit( types.SET_HASMORE, postsCollection.hasMore() )
		commit( types.SET_POSTS, posts )

		return true
	}
	return false
}

const AuthorArchivePosts = async ( { commit, state } ) => {
	let postsCollection = new wp.api.collections.Posts()
	let page = state.route.params.page || 1
	let data = { page: page }

	if ( state.route.name === 'author' ) {
		let users = await ( new wp.api.collections.Users() ).fetch( { data: { slug: state.route.params.author } } )
		let queriedObject = users[0]
		data = Object.assign( data, { author: queriedObject.id } )
		let posts = await postsCollection.fetch( { data: data } )
		commit( types.SET_QUERIED_OBJECT, queriedObject )
		commit( types.SET_HASMORE, postsCollection.hasMore() )
		commit( types.SET_POSTS, posts )

		return true
	}
	return false
}

const singularPost = async ( { commit, state } ) => {
	let postsCollection = new wp.api.collections.Posts()
	let posts = []
	let queriedObject = {}

	// for singular
	if ( state.route.query.preview ) {
		if ( state.route.query.preview_id ) {
			let model = new wp.api.models.Post( { id: state.route.query.preview_id } )
			queriedObject = await model.fetch()
			posts = [queriedObject]
		} else if ( state.route.query.p ) {
			let model = new wp.api.models.Post( { id: state.route.query.p } )
			queriedObject = await model.fetch()
			posts = [queriedObject]
		} else if ( state.route.query.page_id ) {
			let model = new wp.api.models.Page( { id: state.route.query.page_id } )
			queriedObject = await model.fetch()
			posts = [queriedObject]
		}
	} else {
		// for singular
		switch ( state.route.name ) {
			case 'front-page': {
				let model = new wp.api.models.Page( { id: global.themeSettings.pageOnFront } )
				let queriedObject = await model.fetch()
				posts = [queriedObject]
				break
			}

			case 'page':
				let pagesCollection = new wp.api.collections.Pages()
				let pagenames = []
				if ( state.route.params.pagename ) {
					pagenames = state.route.params.pagename.split( '/' )
					let pagename = pagenames.pop()
					posts = await pagesCollection.fetch( { data: { slug: pagename } } )
					if ( posts.length > 0 ) {
						queriedObject = posts[0]
						break
					}

					if ( !global.themeSettings.useVerbosePageRules ) {
						break
					}
				}

			case 'post': {
				if ( state.route.params.postname || state.route.params.pagename ) {
					posts = await postsCollection.fetch( {
						data: {
							slug: state.route.params.postname || state.route.params.pagename
						}
					} )
					if ( posts.length > 0 ) {
						queriedObject = posts[0]
					}
				} else {
					let model = new wp.api.models.Post( { id: state.route.params.post_id } )
					queriedObject = await model.fetch()
					posts = [queriedObject]
				}

				break
			}
		}
	}

	commit( types.SET_QUERIED_OBJECT, queriedObject )
	commit( types.SET_HASMORE, false )
	commit( types.SET_POSTS, posts )
}

export const fetchPosts = async ( { commit, state } ) => {
	if ( await dateArchivePosts( { commit, state } ) ) {} else if ( await homePosts( {
		commit,
		state
	} ) ) {} else if ( await taxonomyArchivePosts( {
		commit,
		state
	} ) ) {} else if ( await AuthorArchivePosts( { commit, state } ) ) {} else if ( await singularPost( {
		commit,
		state
	} ) ) {}
}
