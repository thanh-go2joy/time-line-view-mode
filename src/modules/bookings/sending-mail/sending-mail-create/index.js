import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/sending-mail-create',
  name: 'sendingMailCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
