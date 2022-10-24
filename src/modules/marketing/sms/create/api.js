import apiCaller from '@/api/apiCaller'

export async function createSMS (params) {
  return await apiCaller.post('send-sms', params)
}
