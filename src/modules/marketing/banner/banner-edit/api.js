import apiCaller from '@/api/apiCaller'

// async function updateBanner (sn, data) {
//   return apiCaller.post(`banners/${sn}?_method=PUT`, data)
// }

async function updateBanner (sn, data) {
  // return apiCaller.post(`https://sa-ha-api.go2joy.vn/api/v2/web/sa/banners/${sn}?_method=PUT`, data)
  return apiCaller.post(`https://staging-api.go2joy.vn/api/v2/web/sa/banners/${sn}?_method=PUT`, data)
}

export {
  updateBanner
}
