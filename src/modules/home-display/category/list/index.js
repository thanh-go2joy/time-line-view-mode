import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/dashboard',
  name: 'home',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
