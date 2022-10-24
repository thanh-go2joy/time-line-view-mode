import apiCaller from '@/api/apiCaller'

export async function fetchCategories () {
  return await apiCaller.get('article/getCategoryList')
}

export async function updateArticle (sn, params) {
  return await apiCaller.post(`/article/updateArticle?sn=${sn}`, params)
}

export async function createArticle (params) {
  return await apiCaller.post('/article/createArticle', params)
}
