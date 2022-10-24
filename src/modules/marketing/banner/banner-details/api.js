import apiCaller from '@/api/apiCaller'

async function getBannerDetails (sn) {
  return await apiCaller.get(`banners/${sn}`)
}

export {
  getBannerDetails
}
