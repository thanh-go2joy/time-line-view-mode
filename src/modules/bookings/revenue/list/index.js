import router from '@/router'

router.addRoute('booking', {
  name: 'revenueReport',
  path: '/hotel/sadmin/revenue-report',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
