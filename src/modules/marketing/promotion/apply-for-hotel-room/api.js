
import apiCaller from '@/api/apiCaller'

export async function listHotelRoomsApply (sn) {
  return await apiCaller.get(`/coupon-hotels/${sn}/getRoomTypeByCouponSn?type=1`)
}
export async function onSaveHotelRoomsApply (dataJson) {
  return await apiCaller.put('/coupon-hotels/updateRoomTypeApply', dataJson)
}
