import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffs',
  path: '/hotel/sadmin/staffs-management',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
