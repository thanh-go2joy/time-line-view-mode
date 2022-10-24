import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp',
  name: 'stamp',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
