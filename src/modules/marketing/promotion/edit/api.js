import apiCaller from '@/api/apiCaller'

export async function getPromotion (sn) {
  return await apiCaller.get(`/promotions/${sn}`)
}

export async function listGroupPromotion (params) {
  return await apiCaller.get('/promotion-groups', { params: params })
}

export async function onEditPromotion (sn, formData) {
  return await apiCaller.post(`/promotions/${sn}?_method=PUT`, formData)
}

export async function onCreatePromotion (formData) {
  return await apiCaller.post('/promotions', formData)
}
