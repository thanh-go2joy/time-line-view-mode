import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-group-mgt',
  name: 'hotel_group_mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
