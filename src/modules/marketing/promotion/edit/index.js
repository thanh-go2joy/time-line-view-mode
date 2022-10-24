import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-edit/:promotionSn',
  name: 'editPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
