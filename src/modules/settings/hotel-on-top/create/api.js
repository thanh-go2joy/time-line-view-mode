import apiCaller from '@/api/apiCaller'

export async function addHotelOnTop (params) {
  return await apiCaller.post('hotel-on-tops/store', params)
}
