import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtEdit',
  path: '/hotel/sadmin/hotel-debt-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
