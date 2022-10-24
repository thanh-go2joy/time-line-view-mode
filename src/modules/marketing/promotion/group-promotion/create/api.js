import apiCaller from '@/api/apiCaller'

export async function onCreateGroupPromotion (formData) {
  return await apiCaller.post('/promotion-groups', formData)
}
export async function getFilterPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/load', { params: params })
}
