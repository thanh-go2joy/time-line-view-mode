import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-setting',
  name: 'bannerSetting',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
