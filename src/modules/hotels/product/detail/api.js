import apiCaller from '@/api/apiCaller'

async function getProductDetail (id) {
  return await apiCaller.get(`/hotel-products/${id}`)
}
export {
  getProductDetail
}
