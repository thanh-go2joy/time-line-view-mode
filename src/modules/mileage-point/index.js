import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'mileagePointMgt',
      path: '/hotel/sadmin',
      redirect: '/hotel/sadmin/mp-boosting-mgt',
      meta: { requiresAuth: true },
      component: routerView
    }
  )
  await import('./point-list-user-mgt')
  await import('./mp-boosting')
  await import('./point-user-mgt')
}
initRouter()
