import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-detail/:sn',
  name: 'popupDetails',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
