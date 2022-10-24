import apiCaller from './apiCaller'

async function listRoomType (params) {
  return await apiCaller.get('/room-types', { params: params })
}

async function getRoomType (sn) {
  return await apiCaller.get(`/room-types/${sn}`)
}

async function listExtraFee (sn) {
  return await apiCaller.get(`room-types/${sn}/extra-fee`)
}

async function listDirectDiscount (sn) {
  return await apiCaller.get(`room-types/${sn}/direct-discount`)
}

async function listLockRoom (sn) {
  return await apiCaller.get(`/room-types/hotel/${sn}/lock-room-setting`)
}

async function listSettingFS () {
  return await apiCaller.get('/room-types/flash-sale/setting')
}

async function listFacilities (params) {
  return await apiCaller.get('facilities', { params: params })
}

async function onCancelLockRoom (sn) {
  return await apiCaller.post(`/room-types/${sn}/cancel-lock-room?_method=PUT`)
}

async function onConfirmLockRoom (sn) {
  return await apiCaller.post(`/room-types/${sn}/confirm-lock-room?_method=PUT`)
}

async function onBlockRoomType (sn) {
  return await apiCaller.post(`/room-types/${sn}/block-room-type?_method=PUT`)
}

async function onCancelFlashSale (sn) {
  return await apiCaller.post(`/room-types/${sn}/flash-sale/cancel?_method=PUT`)
}

async function onDeleteRoomType (sn) {
  return await apiCaller.delete(`/room-types/${sn}`)
}

async function onCreateExtraFee (sn, dataJson) {
  return await apiCaller.post(`/room-types/${sn}/extra-fee?_method=PUT`, dataJson)
}

async function onCreateDirectDiscount (sn, dataJson) {
  return await apiCaller.post(`/room-types/${sn}/direct-discount?_method=PUT`, dataJson)
}

async function onDeleteExtraFee (sn) {
  return await apiCaller.post(`room-types/${sn}/extra-fee/delete?_method=PUT`)
}

async function onDeleteDirectDiscount (sn) {
  return await apiCaller.post(`room-types/${sn}/direct-discount/delete?_method=PUT`)
}

async function onCheckDayApply (sn, params) {
  return await apiCaller.get(`room-types/${sn}/checkDayApply`, { params: params })
}

async function onExportFlashSale (params) {
  return await apiCaller.get('exports/flash-sale', { params: params })
}

async function onUpdateSettingFS (dataJson) {
  return await apiCaller.put('/room-types/flash-sale/setting', dataJson)
}

async function onCreateRoomType (dataJson) {
  return await apiCaller.post('/room-types', dataJson)
}

async function onEditRoomType (sn, dataJson) {
  return await apiCaller.post(`/room-types/${sn}?_method=PUT`, dataJson)
}

async function listLockRoomHistory (hotelSn, roomTypeSn) {
  return await apiCaller.get(`/room-types/lockRoomSetting/getHistoryLockDateHotel?hotelSn=${hotelSn}&roomTypeSn=${roomTypeSn}`)
}

export {
  listRoomType,
  getRoomType,
  listLockRoom,
  listSettingFS,
  listFacilities,
  onCancelLockRoom,
  onConfirmLockRoom,
  onBlockRoomType,
  onCancelFlashSale,
  onDeleteRoomType,
  listExtraFee,
  listDirectDiscount,
  onCreateExtraFee,
  onCreateDirectDiscount,
  onDeleteExtraFee,
  onDeleteDirectDiscount,
  onCheckDayApply,
  onExportFlashSale,
  onUpdateSettingFS,
  onCreateRoomType,
  onEditRoomType,
  listLockRoomHistory
}
