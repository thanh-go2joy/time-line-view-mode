import apiCaller from '@/api/apiCaller'

export async function deleteCategory (sn) {
  return await apiCaller.post(`category/deleteCategory?sn=${sn}`)
}
export async function fetchCategories () {
  return await apiCaller.get('category/getCategoryList')
}
