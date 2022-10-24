import apiCaller from '@/api/apiCaller'

async function updateNotice (sn, data) {
  return apiCaller.post(`app-notices/${sn}?_method=PUT`, data)
}

async function getAppNoticeDetails (sn) {
  return apiCaller.get(`app-notices/${sn}`)
}

export {
  updateNotice,
  getAppNoticeDetails
}
