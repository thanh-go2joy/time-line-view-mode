import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/crm-detail/:sn',
  name: 'crmDetail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
