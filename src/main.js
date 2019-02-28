import Vue from 'vue'
import helper from './helper'
global.helper = helper
import store from './store/'
global.store = store

import router from './router'
import i18n from './i18n/'
// import menu from './menu'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import './http'
import './fetch'

import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/settings/_colors.styl'
// import '@/styles/main.styl'
import './styles/common.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App.vue'

import Dropzone from 'vue2-dropzone'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
Vue.component('dropzone', Dropzone)

import MyBreadcrumbs from './components/MyBreadcrumbs.vue'
Vue.component('my-breadcrumbs', MyBreadcrumbs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
  mounted () {

  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    // this.$http.get('/users/1').then(({data}) => console.log(data))
    // global.$t = this.$t
    // fetch menu from server
    // this.$http.get('/menu').then(({data}) => {
    //   this.$store.commit('setMenu', data)
    // })
    // this.$store.dispatch('checkPageTitle', this.$route.path)
    // this.$store.dispatch('checkAuth')
  }
})
