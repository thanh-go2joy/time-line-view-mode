import apiCaller from '@/api/apiCaller'

export async function fetchSearchArticles (params) {
  return await apiCaller.get('articleHome/getSearchArticleList', { params: params })
}

export async function fetchArticles (params) {
  return await apiCaller.get('articleHome/getArticleList', { params: params })
}

export async function addArticle (params) {
  return await apiCaller.post('articleHome/addArticle', params)
}

export async function deleteArticle (params) {
  return await apiCaller.post('articleHome/deleteArticle', params)
}

export async function updateThumbnailPath (params) {
  return await apiCaller.post('/articleHome/updateThumbnail', params)
}

export async function fetchHashtags () {
  return await apiCaller.get('articleHome/getHashTagList')
}
