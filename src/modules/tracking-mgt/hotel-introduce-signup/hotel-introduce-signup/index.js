import router from '@/router'
router.addRoute('tracking-mgt', {
  path: '/hotel/sadmin/hotel-introduce-signup',
  name: 'hotelIntroduceSignup',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
