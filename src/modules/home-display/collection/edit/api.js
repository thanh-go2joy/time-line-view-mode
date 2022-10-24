import apiCaller from '@/api/apiCaller'

export async function getCollectionDetails (sn) {
  return await apiCaller.get(`hotel-collections/${sn}`)
}

// export async function updateCollectionDetails (params) {
//   return await apiCaller.post(`hotel-collections/${params.get('sn')}`, params)
// }

export async function updateCollectionDetails (params) {
  // return await apiCaller.post(`https://sa-ha-api.go2joy.vn/api/v2/web/sa/hotel-collections/${params.get('sn')}`, params)
  return await apiCaller.post(`https://staging-api.go2joy.vn/api/v2/web/sa/hotel-collections/${params.get('sn')}`, params)
}
