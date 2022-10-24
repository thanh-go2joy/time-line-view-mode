import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/profile',
  name: 'profile',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
