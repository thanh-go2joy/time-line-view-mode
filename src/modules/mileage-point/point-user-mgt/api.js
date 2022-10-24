import apiCaller from '@/api/apiCaller'

async function fetchMpUsers (params) {
  return await apiCaller.get('mileage-rewards-user', { params: params })
}

async function fetchSuggestionsAppUsers (params) {
  return await apiCaller.get('suggestions/app-users', { params: params })
}

export {
  fetchMpUsers,
  fetchSuggestionsAppUsers
}
