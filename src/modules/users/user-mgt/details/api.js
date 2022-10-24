import apiCaller from '@/api/apiCaller'

export async function getUserDetails (sn) {
  return await apiCaller.get(`users/${sn}`)
}

export async function fetchBookingHistories (params) {
  return await apiCaller.get('/user-booking-histories', { params: params })
}
export async function fetchUserStamps (params) {
  return await apiCaller.get('/user-stamps', { params: params })
}

export async function fetchCoupons (sn, params) {
  return await apiCaller.get(`/coupon-issueds/${sn}/coupons`, { params: params })
}
export async function fetchFavoriteAreas (sn, params) {
  return await apiCaller.get(`/user-favorites/${sn}/areas`, { params: params })
}

export async function fetchFavoriteHotels (sn, params) {
  return await apiCaller.get(`/user-favorites/${sn}/hotels`, { params: params })
}
