import apiCaller from '@/api/apiCaller'

async function addApplyHotel (collectionSn, params) {
  return await apiCaller.get(`/hotel-collections/${collectionSn}/applying-hotels/add?`, { params: params })
}

async function deleteApplyHotel (collectionSn, hotelSn) {
  return await apiCaller.get(`hotel-collections/${collectionSn}/applying-hotels/remove`, { params: hotelSn })
}

async function fetchApplyHotels (collectionSn, params) {
  return await apiCaller.get(`hotel-collections/${collectionSn}/applying-hotels`, { params: params })
}

async function resetApplyHotels (collectionSn) {
  return await apiCaller.get(`hotel-collections/${collectionSn}/applying-hotels/reset`)
}

async function saveApplyHotels (collectionSn) {
  return await apiCaller.post(`hotel-collections/${collectionSn}/applying-hotels/save`)
}
async function sortApplyHotels (collectionSn, query) {
  return await apiCaller.post(`hotel-collections/${collectionSn}/sort?${query}`)
}

export {
  addApplyHotel,
  fetchApplyHotels,
  resetApplyHotels,
  deleteApplyHotel,
  saveApplyHotels,
  sortApplyHotels
}
