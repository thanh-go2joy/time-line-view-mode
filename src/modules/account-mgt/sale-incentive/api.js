import apiCaller from '@/api/apiCaller'

export async function fetchSaleIncentiveHistoryDetails (params) {
  return await apiCaller.get('sale-incentive-history-details', { params: params })
}

export async function exportsSaleIncentiveHistoryDetails (params) {
  return await apiCaller.get('exports/sale-incentive-history-details', { params: params })
}

export async function fetchSaleIncentiveStaffs (params) {
  return await apiCaller.get('sale-incentives', { params: params })
}
