import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/collection',
  name: 'collection',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
