import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice-edit/:sn',
  name: 'noticeEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
