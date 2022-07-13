const loginUrl = '/auth/signin'

const signupUrl = '/auth/signup'

const getProfile = '/auth/usersv/get'

const getAllUserUrl = '/auth/usersv/undel'

const getRequestUser = '/auth/usersv/del'

const getDeleteUser = '/users/inactive'

const restoreUser = '/users/restore'

const identifyUser = '/users/identify'

const getAllParent = '/categories/allWithChildren'

const addTag = '/jobs/tags'

const getOneCategory = '/categories/getone'

const getAllJobs = '/jobs/jobs'

const getJobRequest = '/jobs/inactive/all'

const identifyJob = '/jobs/active'

const getDeletedJob = '/jobs/softdelete/all'

const deletePermanentlyJob = '/jobs/delete'

const uploadFile = '/apply/upload'

const addJob = '/jobs/jobs'

const getAllTag = '/auth/test/user'

const getCandidate = '/user/user/cvinfo'

const acceptJob = '/jobs/accept'

const denyJob = '/jobs/deny'

const changePassword = '/auth/me/password'

const changePhone = '/auth/me/phone'

const changeAvatar = '/auth/me/avatar'

const getAllRole = '/permission/role/all'

const getPermissionByRoleId = '/permission'

const getAllPermission = '/permission/all'

const addRole = '/permission/role'

const restoreJob = '/jobs/restore'

const getListJob = '/jobs/jobs'

const getJobDetail1 = '/jobs/jobs'

const getAllCv = '/cv/cv'

const getCvByUsername = '/cv/cv/2/files/user'

const getJobByUsername = '/jobs/jobs/findjob'

const postCv = '/cv/cv/2/upload'

const applyCv = '/user/user/applyjob'
export default {
  postCv,
  applyCv,
  getCvByUsername,
  getJobByUsername,
  getListJob,
  getJobDetail1,
  loginUrl,
  signupUrl,
  getProfile,
  getAllUserUrl,
  getRequestUser,
  getDeleteUser,
  restoreUser,
  identifyUser,
  getAllParent,
  addTag,
  getOneCategory,
  getAllJobs,
  getJobRequest,
  identifyJob,
  getDeletedJob,
  deletePermanentlyJob,
  uploadFile,
  addJob,
  getAllTag,
  getCandidate,
  acceptJob,
  denyJob,
  changePassword,
  changePhone,
  changeAvatar,
  getAllRole,
  getPermissionByRoleId,
  getAllPermission,
  addRole,
  restoreJob,
  getAllCv,
}
