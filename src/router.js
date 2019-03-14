import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import helper from './helper'

const router = new Router({
  base: __dirname,
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      exact: true,
      path: '/login',
      component: resolve => require(['@/pages/Login.vue'], resolve)
    },
    {
      exact: true,
      path: '/login/:id',
      component: resolve => require(['@/pages/Login.vue'], resolve)
    },
    {
      exact: true,
      path: '/',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      children: [
        {
          exact: true,
          path: '/',
          component: resolve => require(['@/pages/Home.vue'], resolve)
        },
        {
          exact: true,
          path: '/client-manager',
          component: resolve => require(['@/pages/ClientManager.vue'], resolve)
        },
        {
          exact: true,
          path: '/client-manager-edit/:cliCode',
          component: resolve => require(['@/pages/EditClientManager.vue'], resolve)
        },
        {
          exact: true,
          path: '/Account-statistics',
          component: resolve => require(['@/pages/AccountStatistics.vue'], resolve)
        },
        {
          exact: true,
          path: '/error',
          component: resolve => require(['@/pages/Error.vue'], resolve)
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  helper.ls.set('polyRouter', from.path)
  const name = helper.ls.get('PolyName')
  if (to.path.indexOf('login') === -1) {
    if (typeof name !== 'undefined' && !name) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
