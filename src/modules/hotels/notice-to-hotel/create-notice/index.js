import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/notice-to-hotel-create',
  name: 'notice_to_hotel_create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
