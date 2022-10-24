import apiCaller from '@/api/apiCaller'

async function updateNotification (sn, data) {
  return apiCaller.post(`app-notifications/${sn}?_method=PUT`, data)
}

export {
  updateNotification
}
