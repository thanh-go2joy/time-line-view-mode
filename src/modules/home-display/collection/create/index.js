import router from '@/router'

router.addRoute('collection', {
  path: '/hotel/sadmin/collection-create',
  name: 'collectionCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
