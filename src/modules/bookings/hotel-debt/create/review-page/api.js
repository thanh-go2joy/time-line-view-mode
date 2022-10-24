import apiCaller from '@/api/apiCaller'

export async function listReviewHoteldebt (formData) {
  return await apiCaller.post('/hotel-debts/review-hotel-debt', formData)
}
