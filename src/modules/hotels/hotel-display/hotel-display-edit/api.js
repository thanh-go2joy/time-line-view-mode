import apiCaller from '@/api/apiCaller'

async function updateHotelDisplay (sn, data) {
  return await apiCaller.post(`hotels/${sn}?_method=PUT`, data)
}

async function checkVerifyContractId (data) {
  return await apiCaller.post('commons/verify-contract-id', data)
}

export {
  updateHotelDisplay,
  checkVerifyContractId
}
