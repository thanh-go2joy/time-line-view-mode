import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/promotion',
  name: 'promotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
