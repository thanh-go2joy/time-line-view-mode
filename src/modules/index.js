const initRouter = async function () {
  await import('./hotels')
  await import('./profile')
  await import('./page-not-found')
}
initRouter()
