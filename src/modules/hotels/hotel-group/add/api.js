import apiCaller from '@/api/apiCaller'

async function createHotelGroup (formData) {
  return await apiCaller.post('/hotel-groups', formData)
}
async function getHotel (params) {
  return await apiCaller.get('/hotels', { params: params })
}
export {
  createHotelGroup,
  getHotel
}
