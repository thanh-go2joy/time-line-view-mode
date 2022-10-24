import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-setting',
  name: 'popupSetting',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
