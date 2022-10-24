import apiCaller from '@/api/apiCaller'
async function getNoticeToHotelById (id) {
  return await apiCaller.get(`/faq-information/${id}`)
}
async function updateNoticeToHotelById (id, formData) {
  return await apiCaller.post(`/faq-information/${id}?_method=PUT`, formData)
}
async function resetApplyingHotelFaq () {
  return await apiCaller.get('/commons/reset-applying-hotel-faq')
}
async function loadApplyingHotelFaq (id) {
  return await apiCaller.get(`/commons/load-applying-hotel-faq?faqInformationSn=${id}&limit=1000000`)
}
export {
  getNoticeToHotelById,
  updateNoticeToHotelById,
  resetApplyingHotelFaq,
  loadApplyingHotelFaq
}
