import apiCaller from './apiCaller'

async function fetchCrms (params) {
  return await apiCaller.get('suggestions/crm', { params: params })
}

export {
  fetchCrms
}
