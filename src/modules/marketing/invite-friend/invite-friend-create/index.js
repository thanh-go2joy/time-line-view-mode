import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend-create',
  name: 'inviteFriendCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
