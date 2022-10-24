const initRouter = async function () {
  await import('./booking-tracking')
  await import('./hotel-status-tracking')
  await import('./hotel-introduce-signup')
}
initRouter()
