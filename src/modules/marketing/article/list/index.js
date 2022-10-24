import router from '@/router'

router.addRoute('marketing', {
  name: 'article',
  path: '/hotel/sadmin/article',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
