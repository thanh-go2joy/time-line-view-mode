import apiCaller from './apiCaller'

export async function fetchHashtags (params) {
  return await apiCaller.get('suggestions/hash-tags', { params: params })
}
