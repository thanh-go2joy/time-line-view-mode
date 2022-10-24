import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/list-apply-for-hotel',
  name: 'list_apply_for_hotel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
