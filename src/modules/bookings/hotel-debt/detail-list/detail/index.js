import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtDetail',
  path: '/hotel/sadmin/hotel-debt-detail/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
