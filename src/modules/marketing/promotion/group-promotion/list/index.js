import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion',
  name: 'groupPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
