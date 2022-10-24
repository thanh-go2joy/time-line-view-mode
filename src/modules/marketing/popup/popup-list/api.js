import apiCaller from '@/api/apiCaller'

async function fetchPopups (params) {
  return await apiCaller.get('popups', { params: params })
}

export {
  fetchPopups
}
