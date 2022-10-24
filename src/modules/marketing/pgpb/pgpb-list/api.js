import apiCaller from '@/api/apiCaller'

async function fetchPgpbs (params) {
  return await apiCaller.get('sale-info', { params: params })
}

async function exportPgpbs (params) {
  return await apiCaller.get('exports/sale-info', { params: params })
}

async function deletePgpb (sn) {
  return await apiCaller.delete(`sale-info/${sn}`)
}

export {
  fetchPgpbs,
  exportPgpbs,
  deletePgpb
}
