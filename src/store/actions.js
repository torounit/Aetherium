import types from './mutation-types';

export const fetchSiteOption = async ( { commit, state } ) => {
	let response = await fetch( global.wpApiSettings.root );
	let data = await response.json()
	commit( types.SET_SITE_OPTION, data )
}

export const fetchPosts = async ( { commit, state } ) => {

	let postsCollection = new wp.api.collections.Posts();
	let posts = [];

	switch (state.route.name) {
		case 'front-page':
			break;
		case 'home':
			posts = await postsCollection.fetch();
			break;
		case 'category':
			let categories = await (new wp.api.collections.Categories()).fetch( { data: { slug: state.route.params.category } } )
			posts = await postsCollection.fetch( { data: { categories: categories[0].id } } );
			break;
		case 'post':

			if (state.route.params.postname) {
				posts = await postsCollection.fetch( { data: { slug: state.route.params.postname } } );
			}
			else {
				let postModel = new wp.api.models.Post( { id: state.route.params.post_id } )
				let post = await postModel.fetch()
				posts = [ post ]
			}

			break;
		case 'page':
			let pagesCollection = new wp.api.collections.Pages()
			posts = await pagesCollection.fetch( { data: { slug: state.route.params.pagename } } );
			break;
	}

	console.log( posts );

	commit( types.SET_POSTS, posts )
}
