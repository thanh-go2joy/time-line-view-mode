import apiCaller from '@/api/apiCaller'

async function fetchRegisterStampsAvailable (params) {
  return await apiCaller.get('stamps/register-stamps-available', { params: params })
}

async function fetchHotelStamps (params) {
  return await apiCaller.get('stamps/register-stamp-details', { params: params })
}

export {
  fetchRegisterStampsAvailable,
  fetchHotelStamps
}
