import router from '@/router'

router.addRoute('settings', {
  name: 'openSecondSplash',
  path: '/hotel/sadmin/open-second-splash',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
