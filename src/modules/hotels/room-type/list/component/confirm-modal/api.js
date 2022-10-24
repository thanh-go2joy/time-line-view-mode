import apiCaller from '@/api/apiCaller'

export async function listLockRoom (sn) {
  return await apiCaller.get(`/room-types/hotel/${sn}/lock-room-setting`)
}

export async function onCancelLockRoom (sn) {
  return await apiCaller.post(`/room-types/${sn}/cancel-lock-room?_method=PUT`)
}

export async function onConfirmLockRoom (sn) {
  return await apiCaller.post(`/room-types/${sn}/confirm-lock-room?_method=PUT`)
}
