import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notification-edit/:sn',
  name: 'notificationEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
