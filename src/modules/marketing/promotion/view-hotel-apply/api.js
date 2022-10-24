
import apiCaller from '@/api/apiCaller'

export async function listHotelApply (sn, params) {
  return await apiCaller.get(`/promotions/${sn}/hotel-applieds`, { params: params })
}
export async function onDeleteHotelApply (sn) {
  return await apiCaller.get(`/promotions/${sn}/hotel-applieds/delete?_method=PUT`)
}
