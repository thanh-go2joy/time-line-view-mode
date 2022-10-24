import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/notice-to-hotel-reply/:id',
  name: 'notice_to_hotel_reply',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
