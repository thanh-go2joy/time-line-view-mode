import apiCaller from '@/api/apiCaller'

async function getActivitiDetail (id) {
  return await apiCaller.get(`/activities/${id}`)
}
async function getPromotionActivitiDetail (id) {
  return await apiCaller.get(`/promotions/${id}`)
}
async function getInviteFriendActivitiDetail (id) {
  return await apiCaller.get(`/invite-friend/${id}`)
}
async function getProductActivitiDetail (id) {
  return await apiCaller.get(`/hotel-products/${id}`)
}
async function getBookingtransferActivitiDetail (params) {
  return await apiCaller.get('/user-bookings/reports/booking/getUserBookingTransfer', { params: params })
}
async function postConfirmActivitiList (id) {
  return await apiCaller.post(`/activities/${id}/confirm?_method=PUT`)
}
async function postWithdrawActivitiList (id) {
  return await apiCaller.post(`/activities/${id}/cancel?_method=PUT`)
}
export {
  getActivitiDetail,
  getPromotionActivitiDetail,
  getInviteFriendActivitiDetail,
  getProductActivitiDetail,
  getBookingtransferActivitiDetail,
  postConfirmActivitiList,
  postWithdrawActivitiList
}
