import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/product-mgt',
  meta: { active: 'product-mgt', requiresAuth: true },
  name: 'product_mgt',
  component: () => import('./View.vue')
})
