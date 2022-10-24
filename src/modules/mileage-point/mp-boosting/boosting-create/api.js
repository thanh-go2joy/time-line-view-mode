import apiCaller from '@/api/apiCaller'

export async function createMileageReward (params) {
  return await apiCaller.post('mileage-rewards?method=PUT', params)
}
