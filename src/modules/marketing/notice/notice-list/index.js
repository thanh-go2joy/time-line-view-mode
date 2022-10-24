import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/notice',
  name: 'notice',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
