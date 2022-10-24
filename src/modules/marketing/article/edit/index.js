import router from '@/router'

router.addRoute('marketing', {
  name: 'articleEdit',
  path: '/hotel/sadmin/article-editing/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
