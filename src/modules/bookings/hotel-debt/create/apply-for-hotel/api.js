import apiCaller from '@/api/apiCaller'

export async function listHotelApply () {
  return await apiCaller.get('/commons/load-applying-hotel', { params: { limit: 10 } })
}
export async function addHotelApply () {
  return await apiCaller.get('/commons/add-applying-hotel', { params: { limit: 10 } })
}
export async function importHotelApply (limit, applyTarget, formData) {
  return await apiCaller.post(`/commons/import-applying-hotel?limit=${limit}&applyTarget=${applyTarget}`, formData)
}
export async function onSaveHotelApply (params) {
  return await apiCaller.get('/commons/save-applying-hotel', { params: params })
}
export async function onRemoveHotelApply (params) {
  return await apiCaller.get('/commons/remove-applying-hotel', { params: params })
}
