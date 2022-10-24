import apiCaller from '@/api/apiCaller'

async function createFacility (formData) {
  return await apiCaller.post('/facilities', formData)
}
export {
  createFacility
}
