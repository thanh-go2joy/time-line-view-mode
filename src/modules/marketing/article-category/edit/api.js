import apiCaller from '@/api/apiCaller'

export async function getCategoryDetails (params) {
  return await apiCaller.get('category/getCategoryInfo', { params: params })
}

export async function updateCategory (sn, params) {
  return await apiCaller.post(`category/updateCategory?categorySn=${sn}`, params)
}
