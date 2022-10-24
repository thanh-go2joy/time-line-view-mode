import apiCaller from '@/api/apiCaller'

export async function fetchFirstBookings (params) {
  return await apiCaller.get('/user-first-bookings', { params: params })
}

export async function updateFirstBooking (params) {
  return await apiCaller.post('/user-first-bookings', params)
}
export async function fetchStatisticsFirstBookings () {
  return await apiCaller.get('/user-first-bookings/statistics')
}
