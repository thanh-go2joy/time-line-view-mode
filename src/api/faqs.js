import apiCaller from './apiCaller'

async function fetchFaqs (params) {
  return await apiCaller.get('suggestions/faq', { params: params })
}

export {
  fetchFaqs
}
