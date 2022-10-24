
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/view-room-type/:sn',
  name: 'detailRoomType',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
