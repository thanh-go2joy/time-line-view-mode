import apiCaller from '@/api/apiCaller'

export async function listPromotion (params) {
  return await apiCaller.get('/promotions', { params: params })
}
