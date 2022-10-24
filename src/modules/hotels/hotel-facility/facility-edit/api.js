import apiCaller from '@/api/apiCaller'
async function getFacilityById (id) {
  return await apiCaller.get(`/facilities/${id}`)
}
async function updateFacilityById (id, formData) {
  return await apiCaller.post(`/facilities/${id}?_method=PUT`, formData)
}
export {
  getFacilityById,
  updateFacilityById
}
