import apiCaller from '@/api/apiCaller'

async function fetchInviteFriends (sn, params) {
  return await apiCaller.get(`invite-history/inviter/${sn}`, { params: params })
}

export {
  fetchInviteFriends
}
