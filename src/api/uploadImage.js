import apiCaller from './apiCaller'

export async function uploadImage (params) {
  return await apiCaller.post('/commons/getUrlPromotionContentImageByUpload', params)
}
