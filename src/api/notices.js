import apiCaller from './apiCaller'

async function fetchNotices (params) {
  return await apiCaller.get('app-notices', { params: params })
}

export {
  fetchNotices
}
