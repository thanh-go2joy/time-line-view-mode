import router from '@/router'

router.addRoute({
  path: '/hotel/sadmin/update-service-agreement',
  name: 'update_service_agreement_mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
