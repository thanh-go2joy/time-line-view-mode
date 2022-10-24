import apiCaller from '@/api/apiCaller'

async function createInviteFriend (data) {
  return apiCaller.post('invite-friend', data)
}

export {
  createInviteFriend
}
