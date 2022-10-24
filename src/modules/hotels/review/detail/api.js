
import apiCaller from '@/api/apiCaller'

export async function listReviewDetail (params) {
  return await apiCaller.get('hotel-reviews/details', { params: params })
}

export async function onShowHideReview (sn, dataJson) {
  return await apiCaller.get(`hotel-reviews/details/${sn}`, dataJson)
}
