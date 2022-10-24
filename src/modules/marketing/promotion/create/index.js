import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion-create',
  name: 'createPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
