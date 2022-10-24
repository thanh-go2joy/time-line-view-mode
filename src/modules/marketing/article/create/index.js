import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCreate',
  path: '/hotel/sadmin/article-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
