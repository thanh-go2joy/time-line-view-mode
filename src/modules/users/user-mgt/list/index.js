import router from '@/router'

router.addRoute('user', {
  name: 'userMgt',
  path: '/hotel/sadmin/users',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
