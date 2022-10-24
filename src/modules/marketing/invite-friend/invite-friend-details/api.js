import apiCaller from '@/api/apiCaller'

async function getInviteFriendDetails (sn) {
  return await apiCaller.get(`invite-friend/${sn}`)
}

async function sendRequestActivity (params) {
  return await apiCaller.post('commons/send-request-activity', params)
}

export {
  getInviteFriendDetails,
  sendRequestActivity
}
