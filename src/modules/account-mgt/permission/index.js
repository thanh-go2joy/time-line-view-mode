import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'permission',
  path: '/hotel/sadmin/permission',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
