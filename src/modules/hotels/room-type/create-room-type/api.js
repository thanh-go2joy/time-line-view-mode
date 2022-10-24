import apiCaller from '@/api/apiCaller'

export async function onCreateRoomType (dataJson) {
  return await apiCaller.post('/room-types', dataJson)
}
