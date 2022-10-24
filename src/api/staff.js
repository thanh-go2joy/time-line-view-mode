import apiCaller from './apiCaller'

export async function fetchStaffs (params) {
  return await apiCaller.get('staffs', { params: params })
}

export async function fetchManagerStaffs (params) {
  return await apiCaller.get('staffs/manager/roles', { params: params })
}
