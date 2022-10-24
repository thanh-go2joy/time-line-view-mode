import apiCaller from '@/api/apiCaller'

async function getHotelStatusTrackingRegion (params) {
  return await apiCaller.get('/trackings/hotel', { params: params })
}

async function exportDataHotelStatusTracking (params) {
  return await apiCaller.get('/exports/tracking-hotel', { params: params })
}

export {
  getHotelStatusTrackingRegion,
  exportDataHotelStatusTracking
}
