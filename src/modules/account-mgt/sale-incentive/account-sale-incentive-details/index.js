import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'AccountSaleIncentiveDetail',
  path: '/hotel/sadmin/account-sale-incentive-detail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
