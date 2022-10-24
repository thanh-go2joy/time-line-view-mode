import apiCaller from '@/api/apiCaller'

async function getDataHotelGroupById (id) {
  return await apiCaller.get(`/hotel-groups/${id}`)
}
async function updateDataHotelGroupById (id, params) {
  return await apiCaller.put(`/hotel-groups/${id}`, params)
}
async function getHotel (params) {
  return await apiCaller.get('/hotels', { params: params })
}
async function getListHotelForHotelGroupById (id, params) {
  return await apiCaller.get(`/hotel-groups/list/${id}`, { params: params })
}
export {
  getDataHotelGroupById,
  updateDataHotelGroupById,
  getListHotelForHotelGroupById,
  getHotel
}
