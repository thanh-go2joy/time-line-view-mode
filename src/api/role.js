import apiCaller from './apiCaller'

export async function fetchRoles (params) {
  return await apiCaller.get('roles', { params: params })
}
