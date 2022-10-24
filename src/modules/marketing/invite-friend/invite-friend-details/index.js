import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend-detail/:sn',
  name: 'inviteFriendDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
