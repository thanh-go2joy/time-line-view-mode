import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/create-crm/:sn?',
  name: 'crmCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
