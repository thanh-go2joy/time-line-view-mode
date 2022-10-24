import router from '@/router'
router.addRoute('tracking-mgt', {
  path: '/hotel/sadmin/checkin-by-register',
  name: 'checkinByRegister',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
