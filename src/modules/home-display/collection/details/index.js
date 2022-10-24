import router from '@/router'

router.addRoute('collection', {
  path: '/hotel/sadmin/collection-details/:sn',
  name: 'collectionDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
