import router from '@/router'

router.addRoute('booking', {
  name: 'ApplyForHotel',
  path: '/hotel/sadmin/apply-for-hotel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
