import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/notice-to-hotel',
  name: 'notice_to_hotel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
