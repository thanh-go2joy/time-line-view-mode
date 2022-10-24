import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend-edit/:sn',
  name: 'inviteFriendEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
