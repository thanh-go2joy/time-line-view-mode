import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute({
    name: 'user',
    path: '/hotel/sadmin',
    meta: { requiresAuth: true },
    component: routerView
  })
  await import('./user-mgt')
  await import('./device-mgt')
  await import('./first-booking')
  await import('./counseling-mgt')
}
initRouter()
