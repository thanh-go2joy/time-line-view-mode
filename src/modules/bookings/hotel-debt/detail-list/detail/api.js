import apiCaller from '@/api/apiCaller'

export async function getHotetDebt (sn) {
  return await apiCaller.get(`/hotel-debts/${sn}`)
}
