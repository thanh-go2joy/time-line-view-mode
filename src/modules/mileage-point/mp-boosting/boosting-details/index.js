import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpBoostingDetails',
  path: '/hotel/sadmin/mp-boosting-details/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
