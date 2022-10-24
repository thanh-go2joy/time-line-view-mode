import apiCaller from '@/api/apiCaller'

export async function fetchPermissions (params) {
  return await apiCaller.get('permissions', { params: params })
}

export async function fetchPageGroups (params) {
  return await apiCaller.get('page-groups', { params: params })
}

export async function updatePermission (params, sn) {
  return await apiCaller.patch(`permissions/${sn}`, params)
}
