import types from './mutation-types';

export const fetchSiteOption = async ( { commit, state } ) => {
  let response = await fetch( global.wpApiSettings.root );
  let data = await response.json()
  commit( types.SET_SITE_OPTION, data )
}

export const fetchPosts = async ( { commit, state } ) => {

  let postsCollection = new wp.api.collections.Posts();
  let posts = [];
  let queriedObject = {};
  let hasMore = false;
  let page = state.route.params.page || 1;
  let data = { page: page };
  switch (state.route.name) {
    case 'front-page':
      break;
    case 'home':
      posts = await postsCollection.fetch( { data: data } );
      hasMore = postsCollection.hasMore();
      break;
    case 'category': {
      data = Object.assign( data, )
      let categories = await (new wp.api.collections.Categories()).fetch( { data: { slug: state.route.params.category } } )
      queriedObject = categories[ 0 ]
      data = Object.assign( data, { categories: categories[ 0 ].id } )
      posts = await postsCollection.fetch( { data: data } );
      hasMore = postsCollection.hasMore();
      break;
    }
    case 'author': {
      let users = await (new wp.api.collections.Users()).fetch( { data: { slug: state.route.params.author } } )
      queriedObject = users[ 0 ]
      data = Object.assign( data, { author: users[ 0 ].id } )
      posts = await postsCollection.fetch( { data: { author: users[ 0 ].id } } );
      hasMore = postsCollection.hasMore();
      break;
    }
    case 'post': {
      if (state.route.params.postname) {
        posts = await postsCollection.fetch( { data: { slug: state.route.params.postname } } );
      }
      else {
        let postModel = new wp.api.models.Post( { id: state.route.params.post_id } )
        let post = await postModel.fetch()
        posts = [ post ]
      }
      queriedObject = posts[ 0 ]
      break;
    }
    case 'page':
      let pagesCollection = new wp.api.collections.Pages()
      posts = await pagesCollection.fetch( { data: { slug: state.route.params.pagename } } );
      queriedObject = posts[ 0 ]
      break;
  }

  commit( types.SET_QUERIED_OBJECT, queriedObject )
  commit( types.SET_HASMORE, hasMore )
  commit( types.SET_POSTS, posts )
}
