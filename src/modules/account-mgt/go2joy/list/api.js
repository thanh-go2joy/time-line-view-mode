import apiCaller from '@/api/apiCaller'

export async function updateStatus (sn, params) {
  return await apiCaller.post(`/staffs/${sn}/status?_method=PUT`, params)
}
