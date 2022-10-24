import apiCaller from './apiCaller'

async function signIn (payload) {
  return await apiCaller.post('/sign-in', payload)
}

async function signOut () {
  return await apiCaller.post('/sign-out')
}

async function verifyOTP (payload) {
  return await apiCaller.post('/signIn/verifyOTP', payload)
}

export {
  signIn,
  signOut,
  verifyOTP
}
