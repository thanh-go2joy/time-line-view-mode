import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingMgt',
  path: '/hotel/sadmin/mp-boosting-mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
