import router from '@/router'

router.addRoute('booking', {
  name: 'cashFlowReport',
  path: '/hotel/sadmin/cash-flow-report',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
