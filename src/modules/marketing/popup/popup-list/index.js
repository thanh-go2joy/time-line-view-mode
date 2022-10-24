import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup',
  name: 'popup',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
