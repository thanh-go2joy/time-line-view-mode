import router from '@/router'

router.addRoute('booking', {
  path: '/hotel/sadmin/sending-mail-detail/:sn',
  name: 'sendingMailDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
