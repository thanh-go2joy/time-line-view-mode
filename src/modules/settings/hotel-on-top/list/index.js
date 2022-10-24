import router from '@/router'

router.addRoute('settings', {
  name: 'hotelOnTop',
  path: '/hotel/sadmin/hotel-on-top-management',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
