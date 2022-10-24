import router from '@/router'

router.addRoute('user', {
  name: 'userEdit',
  path: '/hotel/sadmin/user-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
