import apiCaller from '@/api/apiCaller'

async function getFacilityList (params) {
  return await apiCaller.get('/facilities', { params: params })
}
async function deleteFacility (id) {
  return await apiCaller.delete(`/facilities/${id}`)
}

export {
  getFacilityList,
  deleteFacility
}
