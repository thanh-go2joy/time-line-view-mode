import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/banner-create',
  name: 'bannerCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
