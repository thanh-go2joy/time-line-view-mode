import router from '@/router'

router.addRoute('booking', {
  name: 'bookingReportDetails',
  path: '/hotel/sadmin/booking-report-details/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
