import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/booking-tracking-mgt',
  name: 'bookingTrackingMgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
