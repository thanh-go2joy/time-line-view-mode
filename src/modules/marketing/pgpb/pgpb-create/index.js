import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb-create',
  name: 'pgpbCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
