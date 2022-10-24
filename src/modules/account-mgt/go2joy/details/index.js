
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyStaffDetails',
  path: '/hotel/sadmin/staff-details/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
