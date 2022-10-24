import router from '@/router'

router.addRoute('marketing', {
  name: 'Article with title',
  path: '/hotel/sadmin/article-with-title',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
router.addRoute('marketing', {
  name: 'Article with image',
  path: '/hotel/sadmin/article-with-image',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
router.addRoute('marketing', {
  name: 'Article with summary',
  path: '/hotel/sadmin/article-with-summary',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
router.addRoute('marketing', {
  name: 'Article collection',
  path: '/hotel/sadmin/article-collection',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
