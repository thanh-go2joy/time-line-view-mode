import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'saAccountMgt',
      path: '/hotel/sadmin',
      redirect: '/hotel/sadmin/staff-management',
      meta: { requiresAuth: true },
      component: routerView
    }
  )
  await import('./go2joy')
  await import('./permission')
  await import('./sale-incentive')
  await import('./confirm-group')
}
initRouter()
