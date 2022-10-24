import apiCaller from '@/api/apiCaller'

export async function fetchSms (params) {
  return await apiCaller.get('send-sms', { params: params })
}
