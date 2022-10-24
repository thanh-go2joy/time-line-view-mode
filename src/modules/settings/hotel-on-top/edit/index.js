import router from '@/router'

router.addRoute('settings', {
  name: 'hotelOnTopEdit',
  path: '/hotel/sadmin/hotel-on-top-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
