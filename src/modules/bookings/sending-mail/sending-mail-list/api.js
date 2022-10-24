import apiCaller from '@/api/apiCaller'

async function fetchSendingMails (params) {
  return await apiCaller.get('payment-mails', { params: params })
}

async function exportPerSendingMail (params) {
  return await apiCaller.get('exports/hotel-payment-mails', { params: params })
}

export {
  fetchSendingMails,
  exportPerSendingMail
}
