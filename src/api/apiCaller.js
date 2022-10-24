import axios from 'axios'
import { getLocalStorageWithExpiry } from '@/utils/localStorage'
import Vue from 'vue'
import { Message } from 'element-ui'

Vue.prototype.$message = Message

const apiCaller = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
  // timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
// req
apiCaller.interceptors.request.use(function (config) {
  const token = getLocalStorageWithExpiry('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// res
apiCaller.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.data?.code === 3) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    window.location.href = 'sign-in'
    return false
  }
  Vue.prototype.$message({
    type: 'error',
    message: error.response.data.message.toString()
  })
  return error.response
})

export default apiCaller
