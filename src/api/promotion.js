import apiCaller from './apiCaller'

async function fetchPromotionGroups (params) {
  return await apiCaller.get('/promotion-groups', { params: params })
}

async function fetchPromotions (params) {
  return await apiCaller.get('/suggestions/promotion', { params: params })
}

async function fetchPromotionDetail (sn) {
  return await apiCaller.get(`/promotions/${sn}`)
}

export {
  fetchPromotionGroups,
  fetchPromotions,
  fetchPromotionDetail
}
