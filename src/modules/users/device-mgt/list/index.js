import router from '@/router'

router.addRoute('device', {
  name: 'deviceMgt',
  path: '/hotel/sadmin/device',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
