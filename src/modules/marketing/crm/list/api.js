import apiCaller from '@/api/apiCaller'

export async function listCRM (params) {
  return await apiCaller.get('/crm-filters', { params: params })
}

export async function onExportCRM (params) {
  return await apiCaller.get('/exports/crm-report', { params: params })
}

export async function onDeleteCRM (sn) {
  return await apiCaller.post(`/crm-filters/${sn}/delete?_method=PUT`)
}
