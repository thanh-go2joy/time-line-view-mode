import router from '@/router'

router.addRoute('counselings', {
  name: 'replyCounselings',
  path: '/hotel/sadmin/counseling/reply/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
