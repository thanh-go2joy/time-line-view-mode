import apiCaller from '@/api/apiCaller'

export async function getMileageRewardDetails (sn, params) {
  return await apiCaller.get(`mileage-rewards/detail/${sn}`, { params: params })
}
