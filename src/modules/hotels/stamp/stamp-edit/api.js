import apiCaller from '@/api/apiCaller'

async function getStampDetails (sn) {
  return apiCaller.get(`stamps/register-stamps/${sn}`)
}

async function updateStatus (sn, data) {
  return apiCaller.post(`stamps/register-stamps/${sn}/status?_method=PUT`, data)
}

async function updateStamp (sn, data) {
  return apiCaller.post(`stamps/register-stamps/${sn}?_method=PUT`, data)
}

export {
  getStampDetails,
  updateStatus,
  updateStamp
}
