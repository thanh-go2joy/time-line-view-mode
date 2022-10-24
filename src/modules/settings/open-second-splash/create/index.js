import router from '@/router'

router.addRoute('settings', {
  name: 'openSecondSplashCreate',
  path: '/hotel/sadmin/open-second-splash-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
