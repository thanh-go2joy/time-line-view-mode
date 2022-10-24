import apiCaller from '@/api/apiCaller'

export async function listSettingFS () {
  return await apiCaller.get('/room-types/flash-sale/setting')
}

export async function onUpdateSettingFS (dataJson) {
  return await apiCaller.put('/room-types/flash-sale/setting', dataJson)
}
