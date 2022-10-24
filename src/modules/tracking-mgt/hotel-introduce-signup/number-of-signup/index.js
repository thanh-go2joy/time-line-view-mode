import router from '@/router'
router.addRoute('tracking-mgt', {
  path: '/hotel/sadmin/number-of-signup',
  name: 'numberOfSignup',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
