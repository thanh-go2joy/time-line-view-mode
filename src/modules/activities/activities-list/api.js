import apiCaller from '@/api/apiCaller'

async function fetchActivities (params) {
  return await apiCaller.get('/activities', { params: params })
}
async function postConfirmActivitiList (id) {
  return await apiCaller.post(`/activities/${id}/confirm?_method=PUT`)
}
async function postWithdrawActivitiList (id) {
  return await apiCaller.post(`/activities/${id}/cancel?_method=PUT`)
}
export {
  fetchActivities,
  postConfirmActivitiList,
  postWithdrawActivitiList
}
