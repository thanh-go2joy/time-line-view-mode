import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner',
  name: 'banner',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
