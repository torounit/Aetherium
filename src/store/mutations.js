import types from './mutation-types'

export default {
  [ types.SET_SITE_OPTION ] ( state, data ) {
    state.siteOption = data;
  },
  [ types.SET_POSTS ] ( state, posts ) {
    state.posts = posts;
  },
  [ types.SET_POST_TYPES ] ( state, postTypes ) {
    state.postTypes = postTypes;
  },
  [ types.SET_TAXONOMIES ] ( state, taxonomies ) {
    state.taxonomies = taxonomies;
  },
  [ types.SET_QUERIED_OBJECT ] ( state, posts ) {
    state.queriedObject = posts;
  },
  [ types.SET_HASMORE ] ( state, more ) {
    state.hasMore = ! ! more;
  }
}
