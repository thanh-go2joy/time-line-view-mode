import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb-edit/:sn',
  name: 'pgpbEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
