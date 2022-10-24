import apiCaller from '@/api/apiCaller'

async function removeApplyingHotelFaq (params) {
  return await apiCaller.get('/commons/remove-applying-hotel-faq', { params: params })
}
async function getHotelList (params) {
  return await apiCaller.get('/suggestions/hotels', { params: params })
}
async function loadApplyingHotelFaq (params) {
  return await apiCaller.get('/commons/load-applying-hotel-faq', { params: params })
}
async function onImportApplyHotel (params) {
  return await apiCaller.delete('/commons/import-applying-hotel', { params: params })
}
async function addApplyingHotelFaq (params) {
  return await apiCaller.get('/commons/add-applying-hotel-faq', { params: params })
}
async function saveApplyingHotelFaq (params) {
  return await apiCaller.get('/commons/save-applying-hotel-faq', { params: params })
}
export {
  removeApplyingHotelFaq,
  getHotelList,
  loadApplyingHotelFaq,
  onImportApplyHotel,
  addApplyingHotelFaq,
  saveApplyingHotelFaq
}
