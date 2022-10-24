import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCategory',
  path: '/hotel/sadmin/article-category',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
