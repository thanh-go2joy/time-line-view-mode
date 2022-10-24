import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-edit/:sn',
  name: 'bannerEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
