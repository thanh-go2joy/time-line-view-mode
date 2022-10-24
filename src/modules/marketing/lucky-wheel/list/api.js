import apiCaller from '@/api/apiCaller'

export async function fetchLuckyWheel (params) {
  return await apiCaller.get('lucky-wheel/getLuckyWheelDetailList', { params: params })
}
