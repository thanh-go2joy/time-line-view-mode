import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/edit-room-type/:sn',
  name: 'editRoomType',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
