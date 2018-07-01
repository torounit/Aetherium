import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import * as actions from './actions/index.js';
import * as getters from './getters';
import mutations from './mutations.js';

Vue.use( Vuex );

const store = new Vuex.Store({
  state,
  mutations,
  actions,
	getters
});

export default store;
