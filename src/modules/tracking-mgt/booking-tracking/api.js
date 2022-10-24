import apiCaller from '@/api/apiCaller'

async function getTrackingRegion (params) {
  return await apiCaller.get('/trackings/booking', { params: params })
}

export {
  getTrackingRegion
}
