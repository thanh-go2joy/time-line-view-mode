import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion-edit/:sn',
  name: 'editGroupPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
