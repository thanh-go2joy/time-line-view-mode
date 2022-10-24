import apiCaller from '@/api/apiCaller'

// export async function addCollection (params) {
//   return await apiCaller.post('hotel-collections', params)
// }

export async function addCollection (params) {
  // return await apiCaller.post('https://sa-ha-api.go2joy.vn/api/v2/web/sa/hotel-collections', params)
  return await apiCaller.post('https://staging-api.go2joy.vn/api/v2/web/sa/hotel-collections', params)
}
