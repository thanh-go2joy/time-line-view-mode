import apiCaller from '@/api/apiCaller'

export async function fetchTransactions (params) {
  return await apiCaller.get('user-bookings/revenues/transactions', { params: params })
}
