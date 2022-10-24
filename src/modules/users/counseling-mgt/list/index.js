import router from '@/router'

router.addRoute('counselings', {
  name: 'counselingMgt',
  path: '/hotel/sadmin/counseling',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
