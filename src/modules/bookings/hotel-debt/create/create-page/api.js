import apiCaller from '@/api/apiCaller'

export async function getHotelApplyPath () {
  return await apiCaller.get('/commons/load-applying-hotel', { params: { limit: 10 } })
}
export async function onCreateHotelDebt (createType, formData) {
  return await apiCaller.get(`/hotel-debts/create-hotel-${createType}`, formData)
}
