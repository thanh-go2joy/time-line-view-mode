import apiCaller from '@/api/apiCaller'

async function getDataHotelGroupById (id) {
  return await apiCaller.get(`/hotel-groups/${id}`)
}
async function getListHotelForHotelGroupById (id, params) {
  return await apiCaller.get(`/hotel-groups/list/${id}`, { params: params })
}
export {
  getDataHotelGroupById,
  getListHotelForHotelGroupById
}
