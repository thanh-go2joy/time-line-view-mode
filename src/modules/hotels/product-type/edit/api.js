import apiCaller from '@/api/apiCaller'

async function getProductTypeDetail (id) {
  return await apiCaller.get(`/hotel-product-types/${id}`)
}
async function updateProductTypeDetail (id, formData) {
  return await apiCaller.post(`/hotel-product-types/${id}?_method=PUT`, formData)
}
export {
  getProductTypeDetail,
  updateProductTypeDetail
}
