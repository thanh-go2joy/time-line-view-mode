import axios from 'axios'

export async function uploadFileZip (preSigned, fileData) {
  return axios.put(preSigned, fileData, {
    headers: {
      'Content-Type': fileData.type,
      'Content-Disposition': 'attachment; filename=image.png'
    }
  })
}
