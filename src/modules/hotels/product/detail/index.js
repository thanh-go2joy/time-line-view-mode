import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/product-detail/:id',
  name: 'product_detail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
