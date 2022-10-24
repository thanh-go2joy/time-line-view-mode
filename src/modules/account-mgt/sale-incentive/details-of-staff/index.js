import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'DetailsOfStaff',
  path: '/hotel/sadmin/detail-of-staff/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
