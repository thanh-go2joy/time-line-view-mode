import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-staff-detail/:id',
  name: 'hotel_staff_detail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
