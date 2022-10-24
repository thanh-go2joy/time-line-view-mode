import apiCaller from '@/api/apiCaller'

async function fetchListHotelsBoosting (params) {
  return await apiCaller.get('commons/load-applying-mileage-target', { params: params })
}

async function applyingMileageTarget (params) {
  return await apiCaller.get('commons/add-applying-mileage-target', { params: params })
}

async function saveApplyingMileageTarget (params) {
  return await apiCaller.get('commons/save-applying-mileage-target', { params: params })
}

async function removeApplyingMileageTarget (params) {
  return await apiCaller.get('commons/remove-applying-mileage-target', { params: params })
}

export {
  fetchListHotelsBoosting,
  applyingMileageTarget,
  saveApplyingMileageTarget,
  removeApplyingMileageTarget
}
