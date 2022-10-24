import router from '@/router'

router.addRoute('settings', {
  name: 'generalSetting',
  path: '/hotel/sadmin/general-setting',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
