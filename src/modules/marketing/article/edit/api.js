import apiCaller from '@/api/apiCaller'

export async function getArticleDetails (sn) {
  return await apiCaller.get(`article/getArticleDetail?articleSn=${sn}`)
}
