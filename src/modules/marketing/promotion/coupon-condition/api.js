import apiCaller from '@/api/apiCaller'

export async function getCouponCondition (sn) {
  return await apiCaller.get(`/conditions/${sn}/use-issued`)
}

export async function listHotelApply (sn, params) {
  return await apiCaller.get(`/coupon-hotels/${sn}/applying/hotels/load`, { params: params })
}

export async function listUserApply (sn, params) {
  return await apiCaller.get(`/coupon-users/${sn}`, { params: params })
}

export async function onCreateCouponCondition (sn, dataJson) {
  return await apiCaller.post(`/conditions/${sn}/use-issued?_method=PUT`, dataJson)
}

export async function onSaveVoucher (sn, formData) {
  return await apiCaller.post(`/conditions/${sn}/voucher?_method=PUT`, formData)
}
