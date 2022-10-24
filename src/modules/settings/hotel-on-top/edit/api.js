import apiCaller from '@/api/apiCaller'

export async function fetchHotelOnTopDetails (sn) {
  return await apiCaller.get(`hotel-on-tops/${sn}`)
}

export async function updateHotelOntop (sn, params) {
  return await apiCaller.post(`hotel-on-tops/${sn}?_method=PUT`, params)
}

export async function fetchHotelCollections (params) {
  return await apiCaller.get('hotel-on-tops/province/hotel-collection', { params: params })
}
