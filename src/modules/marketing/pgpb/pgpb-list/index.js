import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb',
  name: 'pgpb',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
