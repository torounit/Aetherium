import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';
import store from './store/index.js';
import filters from './filters';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

const router = new VueRouter({
	mode: 'history',
	routes: [].concat( global.themeSettings.permastructs )
});


Vue.use( filters );

// nonce on inline js. so, update.
const updateNonce = async() => {
	let response = await fetch( global.wpApiSettings.root );
	let data = await response.json();
	if ( data.authentication.cookie && data.authentication.cookie.nonce ) {
		global.wpApiSettings.nonce = data.authentication.cookie.nonce;
	}
};

global.addEventListener( 'load', () => {
	updateNonce();
	sync( store, router );

	Vue.use( VueRouter );
	Vue.use( Vuex );

	const app = new Vue({
		router,
		store,
		template: '<App/>',
		components: { App }
	});

	app.$mount( '#app' );

});
