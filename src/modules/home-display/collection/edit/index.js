import router from '@/router'

router.addRoute('collection', {
  path: '/hotel/sadmin/edit-collection/:sn',
  name: 'collectionEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
