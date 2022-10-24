import apiCaller from '@/api/apiCaller'

export async function fetchLuckyWheelDetail (param) {
  return await apiCaller.get('lucky-wheel/getLuckyWheelDetail', { params: param })
}
export async function fetchCoupon (params) {
  return await apiCaller.get('suggestions/coupon', { params: params })
}

export async function createLuckyWheelDetail (dataJson) {
  return await apiCaller.post('lucky-wheel/createLuckyWheelDetail', dataJson)
}

export async function editLuckyWheelDetail (dataJson) {
  return await apiCaller.post('lucky-wheel/updateLuckyWheelDetail', dataJson)
}
