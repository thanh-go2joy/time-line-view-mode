import apiCaller from '@/api/apiCaller'

export async function fetchArticles (params) {
  return await apiCaller.get('/article/getAllArticle', { params: params })
}
export async function updateStatusDisplay (params) {
  return await apiCaller.put('article/updateStatusDisplay', params)
}
