import router from '@/router'

router.addRoute('marketing', {
  name: 'articleHome',
  path: '/hotel/sadmin/article-home',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
