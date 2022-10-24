import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/hotel-group-create',
  name: 'hotel_group_create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
