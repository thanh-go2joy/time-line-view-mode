
import apiCaller from '@/api/apiCaller'

export async function listReview (params) {
  params.type = JSON.parse(JSON.stringify(params.type))
  return await apiCaller.get('hotel-reviews', { params: params })
}
