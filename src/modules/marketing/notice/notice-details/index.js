import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice-detail/:sn',
  name: 'noticeDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
