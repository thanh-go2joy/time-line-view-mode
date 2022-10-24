import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-edit/:sn',
  name: 'popupEdit',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
