import axiosClient from 'api/axiosClient'
import URL from 'constants/api'
import axiosUpload from './axiosUpload'

function login(data) {
  return axiosClient.post(URL.loginUrl, data)
}

function signup(data, payload) {
  return axiosClient.post(
    URL.signupUrl,
    {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    },
    payload
  )
}

function uploadFile(data) {
  return axiosUpload.post(URL.uploadFile, data)
}

function addJob(data) {
  return axiosClient.post(URL.addJob, data)
}

function getAllTag() {
  return axiosClient.get(URL.getAllTag)
}

function getJobByUserId(data) {
  return axiosClient.get(URL.addJob + '?filter=user.id||$eq||' + data)
}

function getAllJob(data) {
  return axiosClient.get(URL.getListJob, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  })
}
function getJobByUsername(data) {
  return axiosClient.get(URL.getJobByUsername + '/' + data)
}

// function getJobDetail1(data) {
//   return axiosClient.get(URL.getJobDetail1, {
//     headers: {
//       Authorization: `Bearer ${data}`,
//     },
//   })
// }
function getCvByUsername(data) {
  return axiosClient.get(URL.getCvByUsername + '/' + data)
}

function editJobByJobId(id, data) {
  return axiosClient.patch(URL.addJob + `/${id}`, data)
}

function deleteJobByUserId(data) {
  return axiosClient.delete(URL.addJob + `/${data}`)
}

function getCandidate(data) {
  return axiosClient.get(URL.getCandidate + `/${data}`)
}

function acceptJob(id, data) {
  return axiosClient.put(URL.acceptJob + `/${id}`, data)
}

function denyJob(data) {
  return axiosClient.post(
    URL.denyJob + `?cvId=${data.cvId}&jobId=${data.jobId}`
  )
}

function changePassword(data) {
  return axiosClient.put(URL.changePassword, data)
}

function changePhone(data) {
  return axiosClient.patch(URL.changePhone, data)
}

function changeAvatar(data) {
  return axiosClient.put(URL.changeAvatar, data)
}

function getAllCv(data) {
  return axiosClient.get(URL.getAllCv, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  })
}
function postCv(data) {
  return axiosUpload.post(URL.postCv, data)
}

export default {
  postCv,
  getCvByUsername,
  getJobByUsername,
  login,
  signup,
  uploadFile,
  addJob,
  getAllTag,
  getJobByUserId,
  editJobByJobId,
  deleteJobByUserId,
  getCandidate,
  acceptJob,
  denyJob,
  changePassword,
  changePhone,
  changeAvatar,
  getAllJob,
  getAllCv,
}
