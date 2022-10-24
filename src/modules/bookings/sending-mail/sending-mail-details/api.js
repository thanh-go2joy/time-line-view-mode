import apiCaller from '@/api/apiCaller'

async function fetchSendingMailDetails (sn, params) {
  return await apiCaller.get(`payment-mails/${sn}`, { params: params })
}

async function reSendPaymentMail (params) {
  return await apiCaller.put('payment-mails/resend-payment-mail', params)
}

export {
  fetchSendingMailDetails,
  reSendPaymentMail
}
