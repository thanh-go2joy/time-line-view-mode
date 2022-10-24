import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/product-type-edit/:id',
  name: 'product_type_edit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
