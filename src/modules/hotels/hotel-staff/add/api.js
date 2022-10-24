import apiCaller from '@/api/apiCaller'

async function createHotelStaff (hotelSn, formData) {
  return await apiCaller.post(`/hotels/${hotelSn}/staffs`, formData)
}

export {
  createHotelStaff
}
