import apiCaller from '@/api/apiCaller'

export async function fetchHomeCategories (payload) {
  return await apiCaller.get('home-categories', payload)
}
