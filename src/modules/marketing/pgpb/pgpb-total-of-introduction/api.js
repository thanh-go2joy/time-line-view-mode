import apiCaller from '@/api/apiCaller'

async function fetchPgpbs (sn, params) {
  return await apiCaller.get(`sale-invite/${sn}`, { params: params })
}

async function fetchSales (params) {
  return await apiCaller.get('sale-info', { params: params })
}

async function exportPgpbs (params) {
  return await apiCaller.get('exports/sale-invite', { params: params })
}

export {
  fetchPgpbs,
  fetchSales,
  exportPgpbs
}
