import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import * as actions from './actions/index.js';
import * as getters from './getters';
import mutations from './mutations.js';

Vue.use( Vuex );

export default new Vuex.Store( {
	state,
	mutations,
	actions,
	getters,
} );
