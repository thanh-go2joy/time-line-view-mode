import apiCaller from '@/api/apiCaller'

export async function fetchHotels (id) {
  return await apiCaller.get(`/hotel-collections/${id}/applying-hotels`)
}
export async function fetchPromotions (id) {
  return await apiCaller.get(`/hotel-collections/${id}/promotion-suggest`)
}
