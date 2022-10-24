import apiCaller from '@/api/apiCaller'

async function createNotice (data) {
  return apiCaller.post('app-notices', data)
}

export {
  createNotice
}
