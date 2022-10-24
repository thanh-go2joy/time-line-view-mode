import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/choose-winner/:sn',
  name: 'chooseWinner',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
