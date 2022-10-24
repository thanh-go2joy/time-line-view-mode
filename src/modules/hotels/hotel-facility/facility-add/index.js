import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/facility-create',
  name: 'facility_create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
