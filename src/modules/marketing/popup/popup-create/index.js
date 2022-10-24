import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/popup-create',
  name: 'popupCreate',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
