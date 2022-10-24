import apiCaller from '@/api/apiCaller'

export async function getDataBookingAdhoc (params) {
  return await apiCaller.get('/adhoc/booking/getPaymentTransactionInfo', { params: params })
}
export async function updatePaymentTransactionInfo (query) {
  return await apiCaller.post(`/adhoc/booking/updatePaymentTransactionInfo?userBookingSn=${query.userBookingSn}&pspTransactionId=${query.pspTransactionId}`)
}
export async function cancelAgodaBooking (query) {
  return await apiCaller.post(`/adhoc/booking/cancelAgodaBooking?userBookingSn=${query.userBookingSn}&pspTransactionId=${query.pspTransactionId}`)
}
export async function cancelFailedPaymentBooking (query) {
  return await apiCaller.post(`/adhoc/booking/cancelFailedPaymentBooking?userBookingSn=${query.userBookingSn}&pspTransactionId=${query.pspTransactionId}`)
}
export async function bookingsReportsRefund (sn) {
  return await apiCaller.post(`/user-bookings/reports/booking/refund/${sn}?_method=PUT`)
}
export async function updateBookingsZaloPay (query) {
  return await apiCaller.post(`/adhoc/booking/updateRefunded?userBookingSn=${query.userBookingSn}&rfTransactionId=${query.rfTransactionId}`)
}
