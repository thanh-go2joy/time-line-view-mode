
import apiCaller from '@/api/apiCaller'

export async function listUserApply (sn, params) {
  return await apiCaller.get(`/promotions/${sn}/user-applieds`, { params: params })
}

export async function onExportUserApply (params) {
  return await apiCaller.get('/exports/promotion-user-applieds', { params: params })
}
