import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display',
  name: 'hotelDisplay',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
