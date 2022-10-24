import apiCaller from '@/api/apiCaller'

export async function listRoomType (params) {
  return await apiCaller.get('/room-types', { params: params })
}

export async function getRoomType (sn) {
  return await apiCaller.get(`/room-types/${sn}`)
}

export async function onCancelFlashSale (sn) {
  return await apiCaller.post(`/room-types/${sn}/flash-sale/cancel?_method=PUT`)
}

export async function onBlockRoomType (sn) {
  return await apiCaller.post(`/room-types/${sn}/block-room-type?_method=PUT`)
}

export async function onDeleteRoomType (sn) {
  return await apiCaller.delete(`/room-types/${sn}`)
}
