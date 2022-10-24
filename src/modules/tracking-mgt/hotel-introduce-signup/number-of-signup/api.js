import apiCaller from '@/api/apiCaller'

async function getNumberOfSignup (params) {
  return await apiCaller.get('/trackings/hotel-introduce-signup/user', { params: params })
}

export {
  getNumberOfSignup
}
