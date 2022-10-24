import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-detail/:sn',
  name: 'bannerDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
