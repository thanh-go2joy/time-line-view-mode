import apiCaller from '@/api/apiCaller'

export async function getHomeCategoryDetails (id) {
  return await apiCaller.get(`home-categories/${id}`)
}
export async function updateHomeCategory (payload) {
  // return await apiCaller.put(`home-categories/${payload.sn}`, payload)
  return await apiCaller.post(`https://staging-api.go2joy.vn/api/v2/web/sa/home-categories/${payload.sn}?_method=PUT`, payload)
}
