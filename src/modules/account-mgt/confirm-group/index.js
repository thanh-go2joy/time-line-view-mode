
import router from '@/router'

router.addRoute('saAccountMgt', {
  name: 'go2joyConfirmGroup',
  path: '/hotel/sadmin/confirm-group-mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
