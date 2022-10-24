import apiCaller from '@/api/apiCaller'

export async function fetchUserBookingHotels (params) {
  return await apiCaller.get('/user-bookings/reports/hotels', { params: params })
}
export async function refundUserBooking (sn) {
  return await apiCaller.post(`/user-bookings/reports/booking/refund/${sn}?_method=PUT`)
}

export async function confirmUserBooking (sn) {
  return await apiCaller.post(`/user-bookings/reports/booking/confirm/${sn}?_method=PUT`)
}

export async function cancelUserBooking (sn) {
  return await apiCaller.post(`/user-bookings/reports/booking/cancel/${sn}?_method=PUT`)
}
