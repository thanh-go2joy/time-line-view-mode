import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'SaleIncentiveHistoryCreate',
  path: '/hotel/sadmin/sale-incentive-history-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
