import router from '@/router'

router.addRoute('booking', {
  name: 'bookingAdhoc',
  path: '/hotel/sadmin/booking-adhoc',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
