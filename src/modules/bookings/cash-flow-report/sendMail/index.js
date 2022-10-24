import router from '@/router'

router.addRoute('booking', {
  name: 'sendMail',
  path: '/hotel/sadmin/cash-flow-report/sendMail/:startDate/:endDate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
