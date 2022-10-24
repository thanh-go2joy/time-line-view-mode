import apiCaller from '@/api/apiCaller'

async function createPgpb (data) {
  return apiCaller.post('sale-info', data)
}

export {
  createPgpb
}
