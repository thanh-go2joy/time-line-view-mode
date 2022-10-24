import apiCaller from '@/api/apiCaller'

async function getAppNoticeDetails (sn) {
  return await apiCaller.get(`app-notices/${sn}`)
}

export {
  getAppNoticeDetails
}
