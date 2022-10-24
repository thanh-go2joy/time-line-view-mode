import apiCaller from '@/api/apiCaller'

export async function listGroupPromotion (params) {
  return await apiCaller.get('/promotion-groups', { params: params })
}

export async function onCreatePromotion (formData) {
  return await apiCaller.post('/promotions', formData)
}
