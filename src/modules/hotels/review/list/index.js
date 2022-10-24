
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/review',
  name: 'review',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
