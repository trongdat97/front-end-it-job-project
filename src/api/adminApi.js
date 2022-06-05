import axiosClient from 'api/axiosClient'
import URL from 'constants/api'

function login(data) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.post(URL.loginUrl, data)
}

function getProfile() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getProfile)
}

function getAllUser() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getAllUserUrl)
}

function getRequestUser() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getRequestUser)
}

function getDeleteUser() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getDeleteUser)
}

function getUserById(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getAllUserUrl + `/${id}`)
}

function deleteUserById(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.delete(URL.getAllUserUrl + `/${id}`)
}

function restoreUserById(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.put(URL.restoreUser + `/${id}`)
}

function identifyUserById(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.put(URL.identifyUser + `/${id}`)
}

function getAllTags() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getAllTag)
}

function addTag(data) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.post(URL.addTag, data)
}

function getOneCategory(data) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getOneCategory + '/' + data)
}

function editCategory(slug, data) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.patch(URL.addCategory + '/' + slug, data)
}

function deleteCategory(slug) {
  return axiosClient.delete(URL.addCategory + '/' + slug)
}

function getAllRole() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getAllRole)
}

function getPermissionByRoleId(roleId) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getPermissionByRoleId + '/' + roleId)
}

function getAllPermission() {
  return axiosClient.get(URL.getAllPermission)
  // return Promise.resolve({
  //   data: [],
  // })
}
function getAllJobs() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getAllJobs)
}

function getJobById(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getAllJobs + '/' + id)
}

function deleteJob(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.delete(URL.getAllJobs + '/' + id)
}
function getJobRequest() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getJobRequest)
}

function identifyJob(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.put(URL.identifyJob + '/' + id)
}

function getDeletedJob() {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.getDeletedJob)
}

function restoreJob(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.patch(URL.restoreJob + '/' + id)
}

function deletePermanentlyJob(id) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.delete(URL.deletePermanentlyJob + '/' + id)
}

function searchUser(query) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(
    URL.getAllUserUrl +
      `?or=email||$contL||${query}&filter=profile.name||$contL||${query}`
  )
}

function searchCategory(query) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(URL.addCategory + `?filter=name||$contL||${query}`)
}

function searchJob(query) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.get(
    URL.getAllJobs +
      `?or=user.email||$contL||${query}&filter=name||$contL||${query}`
  )
}

function editRole(id, data) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.put(URL.getPermissionByRoleId + '/' + id, data)
}

function addRole(data) {
  // return Promise.resolve({
  //   data: [],
  // })
  return axiosClient.post(URL.addRole, data)
}
export default {
  login,
  getProfile,
  getAllUser,
  getRequestUser,
  getDeleteUser,
  getUserById,
  deleteUserById,
  restoreUserById,
  identifyUserById,
  getAllTags,
  addTag,
  getOneCategory,
  editCategory,
  deleteCategory,
  getAllJobs,
  getJobById,
  deleteJob,
  getJobRequest,
  identifyJob,
  getDeletedJob,
  restoreJob,
  deletePermanentlyJob,
  searchUser,
  searchCategory,
  searchJob,
  getAllRole,
  getPermissionByRoleId,
  getAllPermission,
  editRole,
  addRole,
}
