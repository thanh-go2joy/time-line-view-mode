import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'pointListMgt',
  path: '/hotel/sadmin/point-list-mgt/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
