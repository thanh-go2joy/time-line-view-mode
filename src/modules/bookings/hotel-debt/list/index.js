import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebt',
  path: '/hotel/sadmin/hotel-debt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
