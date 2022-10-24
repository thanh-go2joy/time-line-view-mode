import apiCaller from '@/api/apiCaller'

async function fetchBanners (params) {
  return await apiCaller.get('banners', { params: params })
}

export {
  fetchBanners
}
