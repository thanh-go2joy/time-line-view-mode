import apiCaller from '@/api/apiCaller'

async function getStaffDetail (id) {
  return await apiCaller.get(`/staffs/${id}`)
}

async function updateStaffById (hotelSn, formData) {
  return await apiCaller.post(`/hotels/${hotelSn}/staffs/update?_method=PUT`, formData)
}

export {
  getStaffDetail,
  updateStaffById
}
