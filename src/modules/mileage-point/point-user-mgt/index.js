import router from '@/router'

router.addRoute('mileagePointMgt', {
  name: 'mpUserMgt',
  path: '/hotel/sadmin/mp-user-mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
