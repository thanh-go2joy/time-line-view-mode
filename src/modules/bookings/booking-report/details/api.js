import apiCaller from '@/api/apiCaller'

export async function fetchUserBookingDetails (sn) {
  return await apiCaller.get(`/user-bookings/${sn}/detail`)
}
