import router from '@/router'

router.addRoute('marketing', {
  name: 'Pin article',
  path: '/hotel/sadmin/pin-article',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
