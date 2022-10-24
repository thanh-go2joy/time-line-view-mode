import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/dashboard-details/:sn',
  name: 'categoryDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
