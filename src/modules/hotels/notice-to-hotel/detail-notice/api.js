import apiCaller from '@/api/apiCaller'

async function getNoticeDetail (id) {
  return await apiCaller.get(`/faq-information/${id}`)
}
export {
  getNoticeDetail
}
