
import apiCaller from '@/api/apiCaller'

export async function listMobile (sn, params) {
  return await apiCaller.get(`/crm-filters/${sn}/users`, { params: params })
}
