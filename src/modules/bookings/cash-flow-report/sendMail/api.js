import apiCaller from '@/api/apiCaller'

export async function listSendMail (params) {
  return await apiCaller.get('/payment-mails/send-mails/list', { params: params })
}

export async function onSendMail (formData) {
  return await apiCaller.post('/payment-mails/send-payment-mail', formData)
}
