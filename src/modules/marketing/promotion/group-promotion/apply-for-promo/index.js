import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-apply/:sn?',
  name: 'applyForPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
