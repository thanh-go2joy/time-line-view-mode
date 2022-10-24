import apiCaller from '@/api/apiCaller'

async function getNoticeDetail (id) {
  return await apiCaller.get(`/faq-information/${id}`)
}

async function getContentReply (id) {
  return await apiCaller.get(`/faq-conversation/${id}`)
}

async function onReplyNotice (formData) {
  return await apiCaller.post('/faq-conversation', formData)
}

async function onDoneNotice (formData) {
  return await apiCaller.post('/faq-conversation', formData)
}

export {
  getNoticeDetail,
  getContentReply,
  onReplyNotice,
  onDoneNotice
}
