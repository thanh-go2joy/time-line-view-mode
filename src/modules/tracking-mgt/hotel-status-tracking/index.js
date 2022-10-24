import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/hotel-status-tracking-mgt',
  name: 'hotelStatusTrackingMgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
