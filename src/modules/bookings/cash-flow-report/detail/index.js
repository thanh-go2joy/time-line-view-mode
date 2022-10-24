import router from '@/router'

router.addRoute('booking', {
  name: 'cashFlowReportDetail',
  path: '/hotel/sadmin/cash-flow-report/detail/:sn/:deviceType/:startDate/:endDate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
