import apiCaller from '@/api/apiCaller'

async function getHotelStaffDetail (id) {
  return await apiCaller.get(`/staffs/${id}`)
}
export {
  getHotelStaffDetail
}
