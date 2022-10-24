import apiCaller from '@/api/apiCaller'

export async function onEditRoomType (sn, dataJson) {
  return await apiCaller.post(`/room-types/${sn}?_method=PUT`, dataJson)
}
