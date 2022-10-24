const initRouter = async function () {
  await import('./list')
  await import('./details')
  await import('./edit')
  await import('./apply-hotel')
  await import('./create')
}
initRouter()
