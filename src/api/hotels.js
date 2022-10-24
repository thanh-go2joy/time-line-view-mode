import apiCaller from './apiCaller'

export async function fetchSuggestionsHotels (params) {
  return await apiCaller.get('suggestions/hotels', { params: params })
}

export async function listHotels (params) {
  return await apiCaller.get('hotels', { params: params })
}

export async function fetchHotelGroups (params) {
  return await apiCaller.get('hotel-groups', { params: params })
}
