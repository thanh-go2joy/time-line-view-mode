import apiCaller from '@/api/apiCaller'

export async function getSettings (params) {
  return await apiCaller.get('settings', { params: params })
}

export async function updateSetting (params) {
  return await apiCaller.put('settings/general-setting', params)
}
