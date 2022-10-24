import apiCaller from '@/api/apiCaller'

async function getProductList (params) {
  return await apiCaller.get('/hotel-products', { params: params })
}
async function getProductTypeList (params) {
  return await apiCaller.get('/hotel-product-types', { params: params })
}
export {
  getProductList,
  getProductTypeList
}
