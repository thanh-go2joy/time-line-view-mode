import apiCaller from '@/api/apiCaller'

async function getCommonInfo () {
  return await apiCaller.get('/common-info')
}

async function updatCommonInfo (formData) {
  return await apiCaller.put('/common-info', formData)
}

export {
  getCommonInfo,
  updatCommonInfo
}
