import router from '@/router'

router.addRoute('user', {
  name: 'firstBooking',
  path: '/hotel/sadmin/first-booking',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
