
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/review/detail',
  name: 'reviewDetail',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
