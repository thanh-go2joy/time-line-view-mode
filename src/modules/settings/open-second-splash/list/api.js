import apiCaller from '@/api/apiCaller'

export async function fetchSecondSplashes (params) {
  return await apiCaller.get('second-splashes', { params: params })
}
