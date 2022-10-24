import apiCaller from '@/api/apiCaller'

export async function getCounseling (sn) {
  return await apiCaller.get(`counselings/${sn}`)
}
export async function listQuestionAndAnswer (sn) {
  return await apiCaller.get(`counselings/${sn}/details?limit=100`)
}
export async function onReplyCounseling (sn, dataJson) {
  return await apiCaller.post(`counselings/${sn}/details`, dataJson)
}
export async function onDoneCounseling (sn, dataJson) {
  return await apiCaller.put(`counselings/${sn}`, dataJson)
}
