import apiCaller from '@/api/apiCaller'

export async function updateDisplayType (params) {
  return await apiCaller.post('articleHome/updateDisplayType', params)
}
export async function getDisplayTypeDetail (params) {
  return await apiCaller.get('articleHome/getDisplayTypeDetail', { params: params })
}
