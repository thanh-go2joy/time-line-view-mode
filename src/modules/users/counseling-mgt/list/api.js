import apiCaller from '@/api/apiCaller'

export async function listCounseling (params) {
  return await apiCaller.get('counselings', { params: params })
}
export async function onDeleteCounseling (sn) {
  return await apiCaller.delete(`counselings/${sn}`)
}
