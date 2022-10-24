import apiCaller from '@/api/apiCaller'

export async function listUsers (params) {
  return await apiCaller.get('users', { params: params })
}
export async function onCreateCounseling (dataJson) {
  return await apiCaller.post('counselings', dataJson)
}
