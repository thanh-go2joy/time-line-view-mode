import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtReview',
  path: '/hotel/sadmin/hotel-debt-review',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
