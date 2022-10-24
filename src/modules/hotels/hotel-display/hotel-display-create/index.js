import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-display-create',
  name: 'hotelDisplayCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
