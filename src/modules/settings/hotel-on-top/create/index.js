import router from '@/router'

router.addRoute('settings', {
  name: 'hotelOnTopCreate',
  path: '/hotel/sadmin/hotel-on-top-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
