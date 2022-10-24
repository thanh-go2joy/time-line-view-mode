import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpListHotelBoostingMgt',
  path: '/hotel/sadmin/list-hotel-boosting-mgt/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
