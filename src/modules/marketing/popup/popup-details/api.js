import apiCaller from '@/api/apiCaller'

async function getPopupDetails (sn) {
  return await apiCaller.get(`popups/${sn}`)
}

export {
  getPopupDetails
}
