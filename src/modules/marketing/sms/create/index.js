import router from '@/router'

router.addRoute('marketing', {
  name: 'smsCreate',
  path: '/hotel/sadmin/sms-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
