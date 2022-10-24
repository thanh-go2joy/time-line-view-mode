import apiCaller from '@/api/apiCaller'

export async function onCreateExtraFee (sn, dataJson) {
  return await apiCaller.post(`/room-types/${sn}/extra-fee?_method=PUT`, dataJson)
}

export async function onDeleteExtraFee (sn) {
  return await apiCaller.post(`room-types/${sn}/extra-fee/delete?_method=PUT`)
}
