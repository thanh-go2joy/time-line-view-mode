import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion-create',
  name: 'createGroupPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
