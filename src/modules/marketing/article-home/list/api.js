import apiCaller from '@/api/apiCaller'

export async function fetchDisplayTypes () {
  return await apiCaller.get('articleHome/getDisplayTypeList')
}

export async function updateIndexDisplayType (params) {
  return await apiCaller.post('articleHome/updateIndexDisplayType', params)
}
