import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingEdit',
  path: '/hotel/sadmin/mp-boosting-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
