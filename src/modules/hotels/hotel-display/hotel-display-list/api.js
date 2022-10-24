import apiCaller from '@/api/apiCaller'

async function fetchHotelDisplays (params) {
  return await apiCaller.get('hotels', { params: params })
}

async function exportHotelInfoLists (params) {
  return await apiCaller.get('exports/hotel-info-list', { params: params })
}

export {
  fetchHotelDisplays,
  exportHotelInfoLists
}
