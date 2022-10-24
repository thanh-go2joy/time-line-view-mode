import apiCaller from '@/api/apiCaller'

export async function getHotetDebt (sn) {
  return await apiCaller.get(`/hotel-debts/${sn}`)
}
export async function onEditHotetDebt (sn, dataJson) {
  return await apiCaller.post(`/hotel-debts/${sn}?_method=PUT`, dataJson)
}
export async function onRefeshHotetDebt (params) {
  return await apiCaller.get('/commons/calculate-period-debt', { params: params })
}
