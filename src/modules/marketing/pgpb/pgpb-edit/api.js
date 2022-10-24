import apiCaller from '@/api/apiCaller'

async function getPgpbDetails (sn) {
  return await apiCaller.get(`sale-info/${sn}`)
}

async function updatePgpb (sn, data) {
  return apiCaller.post(`sale-info/${sn}?_method=PUT`, data)
}

export {
  getPgpbDetails,
  updatePgpb
}
