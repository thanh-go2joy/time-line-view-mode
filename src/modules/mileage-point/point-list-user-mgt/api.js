import apiCaller from '@/api/apiCaller'

async function fetchPoints (sn, params) {
  return await apiCaller.get(`users/${sn}/points`, { params: params })
}

export {
  fetchPoints
}
