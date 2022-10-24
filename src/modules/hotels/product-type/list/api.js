import apiCaller from '@/api/apiCaller'

async function getProductTypeList (params) {
  return await apiCaller.get('/hotel-product-types', { params: params })
}
async function changeStatusProductType (sn, json) {
  return await apiCaller.patch(`/hotel-product-types/${sn}`, json)
}
export {
  getProductTypeList,
  changeStatusProductType
}
