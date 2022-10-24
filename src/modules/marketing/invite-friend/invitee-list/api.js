import apiCaller from '@/api/apiCaller'

async function fetchInvitees (sn, params) {
  return await apiCaller.get(`invite-history/invitee/${sn}`, { params: params })
}

export {
  fetchInvitees
}
