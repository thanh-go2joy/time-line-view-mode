
import apiCaller from '@/api/apiCaller'

export async function listHotelApply (sn, params) {
  return await apiCaller.get(`/coupon-hotels/${sn}/applying/hotels/load`, { params: params })
}
export async function addHotelApply (sn, params) {
  return await apiCaller.get(`/coupon-hotels/${sn}/applying/hotels/add`, { params: params })
}
export async function onImportApplyHotel (sn, formData) {
  return await apiCaller.post(`/coupon-hotels/${sn}/applying/hotels/import`, formData)
}
export async function removeHotelApply (sn, params) {
  return await apiCaller.get(`coupon-hotels/${sn}/applying/hotels/remove`, { params: params })
}
export async function onSaveHotelApply (sn, params) {
  return await apiCaller.get(`coupon-hotels/${sn}/applying/hotels/save`, { params: params })
}
export async function onClearHotelApply (sn) {
  return await apiCaller.get(`coupon-hotels/${sn}/applying/hotels/clear`)
}
export async function onCheckRoomTypeByCoupon (sn, params) {
  return await apiCaller.get(`coupon-hotels/${sn}/getRoomTypeByCouponSn`, { params: params })
}
