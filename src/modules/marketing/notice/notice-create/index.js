import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice-create',
  name: 'noticeCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
