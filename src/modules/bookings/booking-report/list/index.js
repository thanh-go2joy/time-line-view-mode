import router from '@/router'

router.addRoute('booking', {
  name: 'bookingReport',
  path: '/hotel/sadmin/booking-report',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
