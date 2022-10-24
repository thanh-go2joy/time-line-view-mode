import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/apply-for-user/:couponSn/:promotionSn',
  name: 'applyForUser',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
