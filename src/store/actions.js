import types from './mutation-types';

export const fetchSiteOption = async ( { commit } ) => {
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

  if (state.route.query.preview) {
    let postModel = new wp.api.models.Post( { id: 1709} );
    let post = await postModel.fetch();
    console.log(post)
    posts = [ post ]
    queriedObject = posts[ 0 ];
  }
  else {
    switch (state.route.name) {
      case 'home':
        posts = await postsCollection.fetch( { data: data } );
        hasMore = postsCollection.hasMore();
        break;
      case 'category': {
        let categories = await (new wp.api.collections.Categories()).fetch( { data: { slug: state.route.params.category } } );
        queriedObject = categories[ 0 ];
        data = Object.assign( data, { categories: categories[ 0 ].id } );
        posts = await postsCollection.fetch( { data: data } );
        hasMore = postsCollection.hasMore();
        break;
      }
      case 'post_tag': {
        let tags = await (new wp.api.collections.Tags()).fetch( { data: { slug: state.route.params.post_tag } } );
        queriedObject = tags[ 0 ];
        data = Object.assign( data, { tags: tags[ 0 ].id } );
        posts = await postsCollection.fetch( { data: data } );
        hasMore = postsCollection.hasMore();
        break;
      }
      case 'author': {
        let users = await (new wp.api.collections.Users()).fetch( { data: { slug: state.route.params.author } } );
        queriedObject = users[ 0 ];
        data = Object.assign( data, { author: users[ 0 ].id } );
        posts = await postsCollection.fetch( { data: data } );
        hasMore = postsCollection.hasMore();
        break;
      }
      case 'post': {
        if (state.route.params.postname) {
          posts = await postsCollection.fetch( { data: { slug: state.route.params.postname } } );
        }
        else {
          let postModel = new wp.api.models.Post( { id: state.route.params.post_id } );
          let post = await postModel.fetch();
          posts = [ post ]
        }
        queriedObject = posts[ 0 ];
        break;
      }
      case 'page':
        let pagesCollection = new wp.api.collections.Pages();
        posts = await pagesCollection.fetch( { data: { slug: state.route.params.pagename } } );
        queriedObject = posts[ 0 ];
        break;
      case 'front-page':
        let pageModel = new wp.api.models.Page( { id: global.themeSettings.pageOnFront } );
        let post = await pageModel.fetch();
        posts = [ post ];
        break;
    }
  }


  commit( types.SET_QUERIED_OBJECT, queriedObject );
  commit( types.SET_HASMORE, hasMore );
  commit( types.SET_POSTS, posts );
};
