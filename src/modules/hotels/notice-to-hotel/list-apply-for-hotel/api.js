import apiCaller from '@/api/apiCaller'

async function loadApplyingHotelFaq (params) {
  return await apiCaller.get('/commons/load-applying-hotel-faq', { params: params })
}

export {
  loadApplyingHotelFaq
}
