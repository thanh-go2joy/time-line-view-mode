import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-staff-mgt',
  name: 'hotel_staff_mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
