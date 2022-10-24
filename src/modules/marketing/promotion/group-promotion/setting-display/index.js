import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/group-promotion-setting',
  name: 'settingGroupPromotion',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
