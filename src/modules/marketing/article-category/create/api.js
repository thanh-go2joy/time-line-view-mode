import apiCaller from '@/api/apiCaller'

export async function createCategory (params) {
  return await apiCaller.post('category/createCategory', params)
}
