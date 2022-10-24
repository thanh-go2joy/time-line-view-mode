import apiCaller from '@/api/apiCaller'

async function getLisReplytNotice (id, params) {
  return await apiCaller.get(`/faq-hotel/${id}`, { params: params })
}
export {
  getLisReplytNotice
}
