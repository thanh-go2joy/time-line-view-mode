import apiCaller from '@/api/apiCaller'

async function updateInviteFriend (sn, data) {
  return apiCaller.post(`invite-friend/${sn}?_method=PUT`, data)
}

async function getInviteFriendDetails (sn) {
  return apiCaller.get(`invite-friend/${sn}`)
}

export {
  updateInviteFriend,
  getInviteFriendDetails
}
