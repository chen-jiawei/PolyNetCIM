import Vue from 'vue'
import helper from './helper'
global.helper = helper
import store from './store/'
global.store = store

import router from './router'
import i18n from './i18n/'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import './http'
import './fetch'

import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/settings/_colors.styl'
import './styles/common.css'

import App from './App.vue'

import MyBreadcrumbs from './components/MyBreadcrumbs.vue'
Vue.component('my-breadcrumbs', MyBreadcrumbs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
