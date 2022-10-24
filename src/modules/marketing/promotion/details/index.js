import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-details/:promotionSn/:couponSn',
  name: 'promotionDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
