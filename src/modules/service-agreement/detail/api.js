import apiCaller from '@/api/apiCaller'

async function getCommonInfo () {
  return await apiCaller.get('/common-info')
}

async function updatCommonInfo (params) {
  return await apiCaller.put('/common-info', params)
}

export {
  getCommonInfo,
  updatCommonInfo
}
