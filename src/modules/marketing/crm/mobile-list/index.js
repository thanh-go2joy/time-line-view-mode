import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/mobile-list/:sn',
  name: 'mobileList',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
