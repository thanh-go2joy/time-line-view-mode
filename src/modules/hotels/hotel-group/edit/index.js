import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-group-edit/:id',
  name: 'hotel_group_edit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
