import apiCaller from '@/api/apiCaller'

async function createHotelDisplay (data) {
  return apiCaller.post('hotels', data)
}

async function getNextIncrementContractId () {
  return apiCaller.get('commons/get-next-increment-contract-id')
}

export {
  createHotelDisplay,
  getNextIncrementContractId
}
