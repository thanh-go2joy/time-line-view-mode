import apiCaller from '@/api/apiCaller'

export async function listGroupPromotion (params) {
  return await apiCaller.get('/promotion-groups', { params: params })
}
export async function getFilterPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/load', { params: params })
}
