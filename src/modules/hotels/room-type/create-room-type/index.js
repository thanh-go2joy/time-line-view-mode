import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/create-room-type',
  name: 'createRoomType',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
