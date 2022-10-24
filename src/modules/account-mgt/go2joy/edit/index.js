
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffEdit',
  path: '/hotel/sadmin/staff-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
