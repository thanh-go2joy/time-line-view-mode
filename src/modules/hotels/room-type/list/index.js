
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/room-type',
  name: 'roomType',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
