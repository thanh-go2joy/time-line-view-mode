import apiCaller from '@/api/apiCaller'

// async function createBanner (data) {
//   return apiCaller.post('banners', data)
// }

async function createBanner (data) {
  // return apiCaller.post('https://sa-ha-api.go2joy.vn/api/v2/web/sa/banners', data)
  return apiCaller.post('https://staging-api.go2joy.vn/api/v2/web/sa/banners', data)
}

export {
  createBanner
}
