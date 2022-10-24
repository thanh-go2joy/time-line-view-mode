import apiCaller from '@/api/apiCaller'

export async function getPromotion (sn) {
  return await apiCaller.get(`/promotions/${sn}`)
}
export async function listUserApply (sn, params) {
  return await apiCaller.get(`/promotions/${sn}/getUserApplyEventList`, { params: params })
}
export async function chooseWinner (dataJson) {
  return await apiCaller.get('/promotions/updateUserWinner', dataJson)
}
