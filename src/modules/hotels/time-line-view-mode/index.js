import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/time-line-view-mode',
  name: 'roomType',
  component: () => import('./View.vue')
})
