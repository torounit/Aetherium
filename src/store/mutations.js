import types from './mutation-types'

export default {
	[ types.SET_SITE_OPTION ] ( state, data ) {
		state.siteOption = data;
	},
	[ types.SET_POSTS ] ( state, posts ) {
		state.posts = posts;
	}
}
