import apiCaller from '@/api/apiCaller'

export async function getStaffDetails (sn) {
  return await apiCaller.get(`/staffs/${sn}`)
}

export async function updateStaff (sn, params) {
  return await apiCaller.post(`/staffs/${sn}?_method=PUT`, params)
}
