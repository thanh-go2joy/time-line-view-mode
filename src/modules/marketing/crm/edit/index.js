import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/crm-edit/:sn',
  name: 'crmEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
