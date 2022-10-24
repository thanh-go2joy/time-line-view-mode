import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-create',
  name: 'stampCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
