import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/notice-to-hotel-detail/:id',
  name: 'notice_to_hotel_detail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
