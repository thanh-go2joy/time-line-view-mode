import apiCaller from '@/api/apiCaller'

export async function getCategotyDetails (sn) {
  return await apiCaller.get(`home-categories/${sn}`)
}
