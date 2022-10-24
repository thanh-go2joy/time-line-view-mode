import router from '@/router'

router.addRoute('booking', {
  name: 'bookingReportHotels',
  path: '/hotel/sadmin/booking-report-hotels',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
