import apiCaller from '@/api/apiCaller'

async function getStampDetails (sn) {
  return await apiCaller.get(`stamps/register-stamps/${sn}`)
}

export {
  getStampDetails
}
