import apiCaller from '@/api/apiCaller'

async function createPopup (data) {
  return apiCaller.post('popups', data)
}

export {
  createPopup
}
