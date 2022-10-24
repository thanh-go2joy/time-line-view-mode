import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification',
  name: 'notification',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
