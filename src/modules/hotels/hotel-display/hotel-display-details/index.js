import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display-details/:sn',
  name: 'hotelDisplayDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
