import apiCaller from '@/api/apiCaller'

async function fetchInviteFriends (params) {
  return await apiCaller.get('invite-friend', { params: params })
}

async function fetchFindVnptBalance () {
  return await apiCaller.get('vnpt-epay/findVnptBalance')
}

async function stopInviteFriend () {
  return await apiCaller.put('invite-friend')
}

export {
  fetchInviteFriends,
  fetchFindVnptBalance,
  stopInviteFriend
}
