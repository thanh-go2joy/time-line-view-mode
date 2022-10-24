import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/lucky-weel',
  name: 'luckyWheel',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
