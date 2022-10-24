import apiCaller from '@/api/apiCaller'

export async function saveSaleIncentiveHistory (params) {
  return await apiCaller.post('sale-incentive-history-details', params)
}
