
import apiCaller from '@/api/apiCaller'

export async function listPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/load', { params: params })
}
export async function onAddPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/add', { params: params })
}
export async function onRemovePromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/remove', { params: params })
}
export async function onSavePromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/save', { params: params })
}
export async function onBackPromotionApply () {
  return await apiCaller.get('/promotion-groups/applying/promotions/clear-cache')
}
export async function getFilterPromotionApply (params) {
  return await apiCaller.get('/promotion-groups/applying/promotions/load', { params: params })
}
