import apiCaller from '@/api/apiCaller'

async function getStaffList (params) {
  return await apiCaller.get('/staffs', { params: params })
}

async function getConfirmGroup (params) {
  return await apiCaller.get('/confirm-groups', { params: params })
}

async function deleteConfirmGroup (id) {
  return await apiCaller.delete(`/confirm-groups/${id}`)
};

async function addConfirmGroup (formData) {
  return await apiCaller.post('/confirm-groups', formData)
};
async function chooseLevelConfirmGroup (formData) {
  return await apiCaller.post('/confirm-groups?_method=PUT', formData)
};

// async function updatedConfirmGroup (formData) {
//   return await apiCaller.post('/confirm-groups?_method=PUT', formData)
// }

export {
  getStaffList,
  getConfirmGroup,
  deleteConfirmGroup,
  addConfirmGroup,
  chooseLevelConfirmGroup
}
