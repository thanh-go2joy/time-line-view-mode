import apiCaller from '@/api/apiCaller'

async function getHotelDisplayDetails (sn) {
  return await apiCaller.get(`hotels/${sn}`)
}

export {
  getHotelDisplayDetails
}
