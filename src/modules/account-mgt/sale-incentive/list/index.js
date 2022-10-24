import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'SaleIncentiveHistory',
  path: '/hotel/sadmin/sale-incentive-history',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
