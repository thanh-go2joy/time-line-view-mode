import router from '@/router'

router.addRoute('user', {
  name: 'userDetails',
  path: '/hotel/sadmin/user-details/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
