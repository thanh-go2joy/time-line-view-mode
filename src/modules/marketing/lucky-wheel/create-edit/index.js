import router from '@/router'

router.addRoute('marketing', {
  name: 'createEditLuckyWheel',
  path: 'hotel/sadmin/create-edit-lucky-weel/:sn?',
  meta: { requiresAuth: true },
  component: () => import('./View.vue')
})
