import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-detail/:sn',
  name: 'stampDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
