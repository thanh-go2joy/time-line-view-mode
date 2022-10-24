import apiCaller from '@/api/apiCaller'

export async function fetchSaleIncentiveHistories (params) {
  return await apiCaller.get('sale-incentive-histories', { params: params })
}
