import apiCaller from '@/api/apiCaller'

export async function listDevice (params) {
  return await apiCaller.get('mobile-devices', { params: params })
}
