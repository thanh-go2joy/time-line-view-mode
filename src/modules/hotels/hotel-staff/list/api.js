import apiCaller from '@/api/apiCaller'

async function getHoteBySn (params) {
  return await apiCaller.get('/hotels', { params: params })
}
async function getHoteStaffList (params) {
  return await apiCaller.get('/hotel-staffs', { params: params })
}
async function updateStatusStaffList (id) {
  return await apiCaller.put(`/staffs/${id}/status`)
}
export {
  getHoteBySn,
  getHoteStaffList,
  updateStatusStaffList
}
