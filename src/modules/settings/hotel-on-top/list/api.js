import apiCaller from '@/api/apiCaller'

export async function fetchHotelOnTops (params) {
  return await apiCaller.get('hotel-on-tops', { params: params })
}
