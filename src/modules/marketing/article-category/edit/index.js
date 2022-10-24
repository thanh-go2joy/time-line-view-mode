import router from '@/router'

router.addRoute('marketing', {
  name: 'articleCategoryEdit',
  path: '/hotel/sadmin/article-category-edit/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
