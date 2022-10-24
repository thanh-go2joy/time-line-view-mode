import router from '@/router'

router.addRoute('booking', {
  path: '/hotel/sadmin/sending-mail',
  name: 'sendingMail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
