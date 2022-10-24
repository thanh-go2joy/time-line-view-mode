import apiCaller from '@/api/apiCaller'

async function createProductType (formData) {
  return await apiCaller.post('/hotel-product-types', formData)
}
export {
  createProductType
}
