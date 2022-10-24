import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/invite-friend',
  name: 'inviteFriend',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
