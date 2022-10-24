import apiCaller from '@/api/apiCaller'

async function getHotelIntroduceSignup (params) {
  return await apiCaller.get('/trackings/hotel-introduce-signup/check-in', { params: params })
}

export {
  getHotelIntroduceSignup
}
