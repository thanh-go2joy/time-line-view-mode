import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'settings',
      path: '/hotel/sadmin',
      redirect: '/hotel/sadmin/general-setting',
      meta: { requiresAuth: true },
      component: routerView
    }
  )
  await import('./general')
  await import('./hotel-on-top')
  await import('./open-second-splash')
}
initRouter()
