import apiCaller from '@/api/apiCaller'

export async function getSecondSplashes (sn) {
  return await apiCaller.get(`second-splashes/${sn}`)
}
export async function updateSecondSplashes (sn, params) {
  return await apiCaller.post(`second-splashes/${sn}?_method=PUT`, params)
}
export async function getStartTime (params) {
  return await apiCaller.get('second-splashes/check/startTime', { params: params })
}
