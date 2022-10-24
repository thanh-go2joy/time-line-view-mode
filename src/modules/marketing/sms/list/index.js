import router from '@/router'

router.addRoute('marketing', {
  name: 'sms',
  path: '/hotel/sadmin/sms',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
