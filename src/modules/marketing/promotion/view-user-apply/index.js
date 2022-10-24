import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/user-apply/:sn/:type',
  name: 'userApply',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
