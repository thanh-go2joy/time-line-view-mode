import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtDetailList',
  path: '/hotel/sadmin/hotel-debt-detail-list/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
