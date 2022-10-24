import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/facility-edit/:id',
  name: 'facility_edit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
