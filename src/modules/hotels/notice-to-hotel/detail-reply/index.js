import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/reply-notice-to-hotel/:id/:faqHotelSn/:hotelSn',
  name: 'reply_to_hotel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
