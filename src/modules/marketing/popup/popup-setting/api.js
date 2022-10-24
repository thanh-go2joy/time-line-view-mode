import apiCaller from '@/api/apiCaller'

async function fetchPopupSettingDisplays () {
  return await apiCaller.get('popups/setting/display')
}

async function updatePopupSettingDisplay (params) {
  return await apiCaller.post('popups/setting/display?_method=PUT', params)
}

async function swapPopup (params) {
  return await apiCaller.post('api/v2/web/sa/popups/updateIdx', params)
}

export {
  fetchPopupSettingDisplays,
  updatePopupSettingDisplay,
  swapPopup
}
