import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/product-type-create',
  name: 'product_type_create',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
