import apiCaller from '@/api/apiCaller'

async function fetchAppNotices (params) {
  return await apiCaller.get('app-notices', { params: params })
}

async function deleteAppNotices (sn) {
  return await apiCaller.delete(`app-notices/${sn}`)
}

export {
  fetchAppNotices,
  deleteAppNotices
}
