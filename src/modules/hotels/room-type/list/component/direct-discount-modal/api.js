import apiCaller from '@/api/apiCaller'

export async function onCreateDirectDiscount (sn, dataJson) {
  return await apiCaller.post(`/room-types/${sn}/direct-discount?_method=PUT`, dataJson)
}

export async function onDeleteDirectDiscount (sn) {
  return await apiCaller.post(`room-types/${sn}/direct-discount/delete?_method=PUT`)
}
