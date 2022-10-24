import apiCaller from '@/api/apiCaller'

async function fetchNotifications (params) {
  return await apiCaller.get('app-notifications', { params: params })
}

async function deleteNotification (sn) {
  return await apiCaller.delete(`app-notifications/${sn}`)
}

export {
  fetchNotifications,
  deleteNotification
}
