import apiCaller from '@/api/apiCaller'

export async function fetchHomeCollections (params) {
  return await apiCaller.get('/hotel-collections', { params: params })
}

export async function sortHotelCollection (query = '') {
  return await apiCaller.post(`/homeDisplayMgt/updateIdxHotelCollection?${query}`)
}

export async function sortHotelCollectionV1 (params) {
  return await apiCaller.patch(`/hotel-collections/sort?collectionSnBefore=${params[0]}&collectionSnAfter=${params[1]}`)
}
