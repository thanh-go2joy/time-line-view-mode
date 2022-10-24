import apiCaller from '@/api/apiCaller'

export async function fetchMileageRewards (params) {
  return await apiCaller.get('mileage-rewards', { params: params })
}
export async function updateMileageRewardsStatus (sn, params) {
  return await apiCaller.post(`mileage-rewards/status/${sn}?_method=PUT`, params)
}
