import apiCaller from '@/api/apiCaller'

async function getNoticeDetail (id) {
  return await apiCaller.get(`/faq-information/${id}`)
}
async function postSendMail (id, formData) {
  return await apiCaller.post(`/faq-information/${id}/send-mail?_method=PUT`, formData)
}
async function resetApplyingHotelFaq () {
  return await apiCaller.get('/commons/reset-applying-hotel-faq')
}
async function loadApplyingHotelFaq (id) {
  return await apiCaller.get(`/commons/load-applying-hotel-faq?faqInformationSn=${id}&limit=1000000`)
}
export {
  getNoticeDetail,
  postSendMail,
  resetApplyingHotelFaq,
  loadApplyingHotelFaq
}
