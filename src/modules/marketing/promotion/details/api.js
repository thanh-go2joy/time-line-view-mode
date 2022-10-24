import apiCaller from '@/api/apiCaller'

export async function getPromotion (sn) {
  return await apiCaller.get(`/promotions/${sn}`)
}

export async function listHotelApply (sn, params) {
  return await apiCaller.get(`/coupon-hotels/${sn}/applying/hotels/load`, { params: params })
}
