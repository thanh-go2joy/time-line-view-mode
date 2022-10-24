import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display-edit/:sn',
  name: 'hotelDisplayEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
