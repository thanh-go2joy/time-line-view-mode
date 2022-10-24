import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCategoryCreate',
  path: '/hotel/sadmin/article-category-create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
