import apiCaller from '@/api/apiCaller'

async function getProfile () {
  return await apiCaller.get('/profile')
}

async function updateProfile (params) {
  return await apiCaller.put('/profile', params)
}

export {
  getProfile,
  updateProfile
}
