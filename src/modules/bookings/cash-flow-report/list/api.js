import apiCaller from '@/api/apiCaller'

export async function listCashFlow (params) {
  return await apiCaller.get('/user-bookings/cash-flows', { params: params })
}
export async function onExportCashFlow (params) {
  return await apiCaller.get('/exports/cash-flow-booking-list', { params: params })
}

export async function onExportCashFlowByID (params) {
  return await apiCaller.get('/exports/cash-flow-booking-internal', { params: params })
}
