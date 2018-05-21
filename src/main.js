import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import store from './store/index.js'

import VueRouter from 'vue-router'
import {sync} from 'vuex-router-sync'

const router = new VueRouter({
  mode: 'history',
  routes: [].concat(global.themeSettings.permastructs)
})

Vue.filter('path', (url) => {
  if (!url) return ''
  let link = document.createElement('a')
  link.href = url
  return link.href.replace(link.origin, '')
})

global.addEventListener('load', () => {
  sync(store, router)

  Vue.use(VueRouter)
  Vue.use(Vuex)

  const app = new Vue({
    router,
    store,
    template: '<App/>',
    components: { App }
  })

  app.$mount('#app')

})
