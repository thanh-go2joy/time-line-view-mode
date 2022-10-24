import apiCaller from '@/api/apiCaller'

async function createNotification (data) {
  return apiCaller.post('app-notifications', data)
}

export {
  createNotification
}
