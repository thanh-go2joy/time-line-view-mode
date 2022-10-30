import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'hotels',
      path: '/hotel/sadmin',
      redirect: '/hotel/sadmin/product-type-mgt',
      meta: { requiresAuth: true },
      component: routerView
    }
  )
  await import('./time-line-view-mode')
}
initRouter()
