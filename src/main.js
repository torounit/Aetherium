import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';
import HtmlTitle from './components/HtmlTitle';
import store from './store/index.js';
import filters from './filters';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

const router = new VueRouter({
	mode: 'history',
	routes: [].concat( global.themeSettings.permastructs ),
	scrollBehavior( to, from, savedPosition ) {
		return new Promise( ( resolve, reject ) => {
			store.watch( ( state ) => state.posts, () => {
				if ( savedPosition ) {
					resolve( savedPosition );
				} else {
					resolve({ x: 0, y: 0 });
				}
			});
		});

	}
});


Vue.use( filters );

// nonce on inline js. so, update. for Not Logged in user.
const updateNonce = async() => {
	if ( ! global.themeSettings.isUserLoggedIn )  {
		let response = await fetch( global.wpApiSettings.root );
		let data = await response.json();
		if ( data.authentication.cookie && data.authentication.cookie.nonce ) {
			wp.api.endpoints.forEach( ( model ) => {
				global.wpApiSettings.nonce = data.authentication.cookie.nonce;
				model.set( 'nonce', '' );
			});
		}
	}
};

global.addEventListener( 'load', async () => {
	await updateNonce();

	sync( store, router );
	Vue.use( VueRouter );
	Vue.use( Vuex );

	const app = new Vue({
		router,
		store,
		components: { App },
		template: '<App/>'

	});
	app.$mount( '#app' );

	const title = new Vue({
		router,
		store,
		components: { HtmlTitle },
		template: '<HtmlTitle/>'
	});
	title.$mount( 'title' );

});
