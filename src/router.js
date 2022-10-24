import Vue from 'vue'
import VueRouter from 'vue-router'
import { i18n } from './plugins/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      localStorage.getItem('access_token') ? next('/hotel/sadmin/dashboard') : next('/hotel/sadmin/login')
    }
  }

]
const router = new VueRouter({
  mode: 'history',
  routes: routes
})
router.beforeEach((to, from, next) => {
  localStorage.setItem('page-back', to.fullPath)
  if (!!to.meta.requiresAuth && !localStorage.getItem('access_token')) {
    return {
      path: '/hotel/sadmin/login',
      query: { redirect: to.fullPath }
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.name) {
    document.title = i18n.t(`breadcrumb.${to.name}`)
  }
})

export default router
