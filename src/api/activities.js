import apiCaller from './apiCaller'

async function onSendRequest (formData) {
  return await apiCaller.post('/commons/send-request-activity', formData)
}

export { onSendRequest }
