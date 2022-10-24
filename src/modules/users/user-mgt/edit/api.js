import apiCaller from '@/api/apiCaller'

export async function updateUser (params) {
  return await apiCaller.put(`users/${params.sn}`, params)
}
