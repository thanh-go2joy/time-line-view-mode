import router from '@/router'

router.addRoute('counselings', {
  name: 'createCounselings',
  path: '/hotel/sadmin/counseling/create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
