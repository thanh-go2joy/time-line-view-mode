import apiCaller from '@/api/apiCaller'

async function createStamp (data) {
  return apiCaller.post('stamps/register-stamps', data)
}

export {
  createStamp
}
