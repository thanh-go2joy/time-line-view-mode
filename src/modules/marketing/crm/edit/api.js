import apiCaller from '@/api/apiCaller'

export async function getCRM (sn) {
  return await apiCaller.get(`/crm-filters/${sn}`)
}
export async function onSaveCRM (sn, dataJson) {
  return await apiCaller.post(`/crm-filters/${sn}?_method=PUT`, dataJson)
}
export async function onExportCRM (params) {
  return await apiCaller.get('/exports/crm-report', { params: params })
}
