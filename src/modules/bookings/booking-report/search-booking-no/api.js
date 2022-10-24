import apiCaller from '@/api/apiCaller'

export async function fetchBookingDetail (params) {
  return await apiCaller.get('/user-bookings/reports/bookings', { params: params })
}
