import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/notice-to-hotel-edit/:id',
  name: 'notice_edit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
