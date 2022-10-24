import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingCreate',
  path: '/hotel/sadmin/mp-boosting-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
