import router from '@/router'

router.addRoute('booking', {
  name: 'revenueReportDetails',
  path: '/hotel/sadmin/revenue-report-details/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
