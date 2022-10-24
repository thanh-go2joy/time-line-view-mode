import apiCaller from '@/api/apiCaller'

async function createNoticeToHotel (formData) {
  return await apiCaller.post('/faq-information', formData)
}

async function loadApplyingHotelFaq () {
  return await apiCaller.get('/commons/load-applying-hotel-faq?limit=1000000')
}
export {
  createNoticeToHotel,
  loadApplyingHotelFaq
}
