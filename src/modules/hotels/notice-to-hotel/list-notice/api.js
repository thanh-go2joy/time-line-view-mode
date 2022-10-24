import apiCaller from '@/api/apiCaller'

async function getNoticeToHotelList (params) {
  return await apiCaller.get('/faq-information', { params: params })
}
async function deleteNoticeToHotelList (id) {
  return await apiCaller.delete(`/faq-information/${id}`)
}
async function resetApplyingHotelFaq () {
  return await apiCaller.get('/commons/reset-applying-hotel-faq')
}
export {
  getNoticeToHotelList,
  deleteNoticeToHotelList,
  resetApplyingHotelFaq
}
