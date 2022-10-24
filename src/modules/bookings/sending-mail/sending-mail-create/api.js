import apiCaller from '@/api/apiCaller'

// main
async function fetchSendingMails (params) {
  return await apiCaller.get('payment-mails/send-mails/list', { params: params })
}

async function fetchHotels (params) {
  return await apiCaller.get('hotels', { params: params })
}

async function sendMails (params) {
  return await apiCaller.post('payment-mails/send-payment-mail', params)
}

export {
  fetchHotels,
  fetchSendingMails,
  sendMails
}
