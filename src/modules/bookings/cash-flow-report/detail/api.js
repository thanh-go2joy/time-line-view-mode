import apiCaller from '@/api/apiCaller'

export async function getCashFlow (sn, params) {
  return await apiCaller.get(`/user-bookings/cash-flows/${sn}`, { params: params })
}
