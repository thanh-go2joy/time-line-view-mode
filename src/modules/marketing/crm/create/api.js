import apiCaller from '@/api/apiCaller'

export async function fetchDistricts (params) {
  return await apiCaller.get(`districts${params}`)
}
export async function onCreate (dataJson) {
  return await apiCaller.post('/crm-filters', dataJson)
}
export async function getCRM (sn) {
  return await apiCaller.get(`/crm-filters/${sn}`)
}
