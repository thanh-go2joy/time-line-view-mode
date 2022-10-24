import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/service-agreement',
  name: 'service_agreement_mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
