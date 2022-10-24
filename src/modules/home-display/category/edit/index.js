import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/dashboard-edit/:sn',
  name: 'categoryEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
