import apiCaller from '@/api/apiCaller'

export async function listGroupPromotion (params) {
  return await apiCaller.get('/promotion-groups/setting/display', { params: params })
}
export async function sortGroupHotel (dataJon) {
  return await apiCaller.post('/promotion-groups/index/swap?_method=PUT', dataJon)
}
export async function getFilterPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/load', { params: params })
}
