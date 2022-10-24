import apiCaller from '@/api/apiCaller'

async function exportStamps (params) {
  return await apiCaller.get('exports/stamp-report', { params: params })
}

async function fetchStamps (params) {
  return await apiCaller.get('stamps/register-stamps', { params: params })
}

export {
  fetchStamps,
  exportStamps
}
