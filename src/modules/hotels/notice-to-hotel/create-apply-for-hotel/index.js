import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/create_apply_for_hotel',
  name: 'create_apply_for_hotel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
