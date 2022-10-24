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
  await import('./product')
  await import('./product-type')
  await import('./hotel-display')
  await import('./stamp')
  await import('./room-type/list')
  await import('./room-type/detail-room-type')
  await import('./room-type/setting-fs')
  await import('./room-type/create-room-type')
  await import('./room-type/edit-room-type')
  await import('./hotel-group')
  await import('./hotel-staff')
  await import('./review/list')
  await import('./review/detail')
  await import('./hotel-facility')
  await import('./notice-to-hotel')
  await import('./time-line-view-mode')
}
initRouter()
