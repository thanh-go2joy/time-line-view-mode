import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'booking',
      path: '/hotel/sadmin',
      meta: { requiresAuth: true },
      component: routerView
    }
  )
  await import('./booking-report')
  await import('./cash-flow-report')
  await import('./hotel-debt')
  await import('./sending-mail')
  await import('./revenue')
  await import('./booking-adhoc')
}
initRouter()
// import router from '@/router'
// import { routerView } from '@/utils/const'

// const initRouter = async function () {
//   router.addRoute({
//     name: 'user',
//     path: '/hotel/sadmin',
//     component: routerView
//   })
//   await import('./user-mgt')
//   await import('./device-mgt')
//   await import('./first-booking')
// }
// initRouter()
