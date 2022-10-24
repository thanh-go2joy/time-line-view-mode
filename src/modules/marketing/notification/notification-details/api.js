import apiCaller from '@/api/apiCaller'

async function getNotificationDetails (sn) {
  return await apiCaller.get(`app-notifications/${sn}`)
}

async function sendNotificationDetails (sn) {
  return await apiCaller.post(`app-notifications/send/${sn}`)
}

export {
  getNotificationDetails,
  sendNotificationDetails
}
