import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/setting-fs',
  name: 'settingFs',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
