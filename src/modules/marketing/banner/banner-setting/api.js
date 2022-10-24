import apiCaller from '@/api/apiCaller'

async function fetchBannerSettingDisplays (params) {
  return await apiCaller.get('banners/setting/display', { params: params })
}

async function updateBannerSettingDisplay (params) {
  return await apiCaller.post('banners/setting/display?_method=PUT', params)
}

async function swapBanner (params) {
  // return await apiCaller.post('banners/index/swap?_method=PUT', params)
  return await apiCaller.post('api/v2/web/sa/banners/updateIdx', params)
}

export {
  fetchBannerSettingDisplays,
  updateBannerSettingDisplay,
  swapBanner
}
