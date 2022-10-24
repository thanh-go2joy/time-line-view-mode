import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/pgpb-total-of-introduction',
  name: 'pgpbTotalOfIntroduction',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
