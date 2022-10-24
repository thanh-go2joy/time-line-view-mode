import router from '@/router'

router.addRoute('collection', {
  name: 'selectApplyHotel',
  path: '/hotel/sadmin/collection-apply-for-hotel/:sn',
  meta: { active: 'collection', requiresAuth: true },
  component: () => import('./View.vue')
})
