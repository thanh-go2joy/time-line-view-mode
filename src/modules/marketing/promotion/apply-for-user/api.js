
import apiCaller from '@/api/apiCaller'

export async function listUserApply (sn, params) {
  return await apiCaller.get(`/coupon-users/${sn}`, { params: params })
}

export async function onDeleteUserApply (sn, appUserSn) {
  return await apiCaller.post(`/coupon-users/${sn}/delete?_method=PUT&appUserSn=${appUserSn}`)
}

export async function onSaveUserApply (sn, formData) {
  return await apiCaller.post(`coupon-users/${sn}?_method=PUT`, formData)
}
