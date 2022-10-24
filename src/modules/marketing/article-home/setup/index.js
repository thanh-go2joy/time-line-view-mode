import router from '@/router'

router.addRoute('marketing', {
  name: 'articleSetup',
  path: '/hotel/sadmin/article-setup/:sn',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
