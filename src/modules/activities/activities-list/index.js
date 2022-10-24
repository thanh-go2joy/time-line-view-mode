import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/activities',
  name: 'activities',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
