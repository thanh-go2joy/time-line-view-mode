import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/hotel-apply/:sn',
  name: 'hotelApply',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
