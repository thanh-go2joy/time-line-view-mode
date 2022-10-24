import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification-create',
  name: 'notificationCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
