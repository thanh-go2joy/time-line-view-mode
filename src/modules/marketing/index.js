import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'marketing',
      path: '/hotel/sadmin',
      redirect: '/hotel/sadmin/promotion',
      meta: { requiresAuth: true },
      component: routerView
    }
  )
  await import('./notice')
  await import('./notification')
  await import('./invite-friend')
  await import('./promotion')
  await import('./article')
  await import('./article-home')
  await import('./article-category')
  await import('./sms')
  await import('./crm')
  await import('./banner')
  await import('./popup')
  await import('./pgpb')
  await import('./lucky-wheel')
}
initRouter()
