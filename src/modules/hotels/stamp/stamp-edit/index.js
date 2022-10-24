import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-edit/:sn',
  name: 'stampEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
