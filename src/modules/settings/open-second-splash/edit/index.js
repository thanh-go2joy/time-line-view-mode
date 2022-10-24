import router from '@/router'

router.addRoute('settings', {
  name: 'openSecondSplashEdit',
  path: '/hotel/sadmin/open-second-splash-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
