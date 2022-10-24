import apiCaller from '@/api/apiCaller'

export async function onEditGroupPromotion (sn, formData) {
  return await apiCaller.post(`/promotion-groups/${sn}?_method=PUT`, formData)
}
export async function getGroupPromotion (sn) {
  return await apiCaller.get(`/promotion-groups/${sn}`)
}
export async function getFilterPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/load', { params: params })
}
