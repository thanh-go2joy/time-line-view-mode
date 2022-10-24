import apiCaller from '@/api/apiCaller'

async function updatePopup (sn, data) {
  return apiCaller.post(`popups/${sn}?_method=PUT`, data)
}

export {
  updatePopup
}
