import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/apply-for-hotel/:couponSn/:promotionSn',
  name: 'applyForHotel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
