import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-facility-mgt',
  name: 'hotel_facility_mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
