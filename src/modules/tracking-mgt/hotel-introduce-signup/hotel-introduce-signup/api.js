import apiCaller from '@/api/apiCaller'

async function getTrackingTotal (params) {
  return await apiCaller.get('/trackings/hotel-introduce-signup', { params: params })
}
async function exportDataHotelIntroductSignup (params) {
  return await apiCaller.get('/exports/hotel-introduce-signup', { params: params })
}
async function exportDataHotelAmenityPack (params) {
  return await apiCaller.get('/exports/hotel-amenity-pack-booking', { params: params })
}
export {
  getTrackingTotal,
  exportDataHotelIntroductSignup,
  exportDataHotelAmenityPack
}
