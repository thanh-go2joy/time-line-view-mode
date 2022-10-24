import apiCaller from '@/api/apiCaller'

export async function createStaff (params) {
  return await apiCaller.post('/staffs', params)
}
