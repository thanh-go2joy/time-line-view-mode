
import router from '@/router'

router.addRoute({
  path: '*',
  name: 'page_not_found',
  meta: { requiresAuth: true },
  component: () => import(/* webpackChunkName: "404" */ './View.vue')
})
