import apiCaller from '@/api/apiCaller'

export async function updateSaleIncentiveHistory (sn, params) {
  return await apiCaller.post(`sale-incentive-histories/${sn}?_method=PATCH`, params)
}
