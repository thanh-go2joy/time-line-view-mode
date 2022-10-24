import apiCaller from '@/api/apiCaller'

export async function getMileageRewardDetails (sn) {
  return await apiCaller.get(`mileage-rewards/${sn}`)
}
export async function updateMileageReward (sn, params) {
  return await apiCaller.post(`mileage-rewards/${sn}?_method=PUT`, params)
}
