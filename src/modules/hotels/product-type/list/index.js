import router from '@/router'
router.addRoute('hotels', {
  path: '/hotel/sadmin/product-type-mgt',
  name: 'product_type_mgt',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
