import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import store from './store/index.js'

import VueRouter from 'vue-router'
import {sync} from 'vuex-router-sync'

const router = new VueRouter( {
	mode: 'history',
	routes: [].concat( global.themeSettings.permastructs )
} )

const unsync = sync( store, router )

Vue.use( VueRouter )
Vue.use( Vuex )

Vue.filter( 'path', ( url ) => {
	if (! url) return ''
	let link = new URL( url );
	return link.href.replace( link.origin, '' );
} );

new Vue( {
	router,
	store,
	el: '#app',
	template: '<App/>',
	components: { App }
} );



