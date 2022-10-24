import apiCaller from '@/api/apiCaller'

export async function fetchUsers (params) {
  return await apiCaller.get('users', { params: params })
}

export async function exportUsers (params) {
  return await apiCaller.get('/exports/users', { params: params })
}

export async function deleteUser (sn) {
  return await apiCaller.delete(`/users/${sn}`)
}

export async function openUser (sn, params) {
  return await apiCaller.patch(`/users/${sn}`, params)
}
