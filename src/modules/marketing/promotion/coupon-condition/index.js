import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/coupon-dondition/:promotionSn/:couponSn',
  name: 'couponCondition',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
