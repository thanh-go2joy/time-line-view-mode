import apiCaller from '@/api/apiCaller'

export async function fetchBookingReports (params) {
  return await apiCaller.get('/user-bookings/reports', { params: params })
}
export async function exportBookingReports (params) {
  return await apiCaller.get('/exports/user-bookings', { params: params })
}
