import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invitee-list/:sn/:inviterUserSn?',
  name: 'inviteeList',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
