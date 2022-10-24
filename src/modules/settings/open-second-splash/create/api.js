import apiCaller from '@/api/apiCaller'

export async function addSecondSplash (params) {
  return await apiCaller.post('second-splashes', params)
}
