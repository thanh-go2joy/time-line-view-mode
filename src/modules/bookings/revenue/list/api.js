import apiCaller from '@/api/apiCaller'

export async function fetchRevenues (params) {
  return await apiCaller.get('user-bookings/revenues', { params: params })
}

export async function updateCompanyCode (params) {
  return await apiCaller.post('commons/update-company-code?_method=PUT', params)
}

export async function exportRevenues (params) {
  return await apiCaller.get('exports/revenue-report', { params: params })
}

export async function exportRevenuesInternal (params) {
  return await apiCaller.get('exports/revenue-report-internal', { params: params })
}
