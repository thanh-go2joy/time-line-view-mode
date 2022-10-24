import router from '@/router'

router.addRoute('booking', {
  name: 'hotelDebtCreate',
  path: '/hotel/sadmin/hotel-debt-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
