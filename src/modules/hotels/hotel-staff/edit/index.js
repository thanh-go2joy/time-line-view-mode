import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-staff-edit/:id',
  name: 'hotel_staff_edit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
