import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/crm',
  name: 'crm',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
