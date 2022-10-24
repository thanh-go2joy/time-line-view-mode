import apiCaller from '@/api/apiCaller'

export async function getFirstBookingDetails (sn) {
  return await apiCaller.get(`/user-bookings/${sn}/detail`)
}
