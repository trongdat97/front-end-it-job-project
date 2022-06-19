const loginUrl = '/auth/signin'

const signupUrl = '/auth/signup'

const getProfile = '/auth/me'

const getAllUserUrl = '/auth/usersv/getall'

const getRequestUser = '/users/unauthorized'

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

const getCandidate = '/jobs/applied'

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

export default {
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
