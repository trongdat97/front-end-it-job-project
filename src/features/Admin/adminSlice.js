import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'
import storageAdmin from 'constants/storageAdmin'

export const getAllUser = createAsyncThunk(
  'admin/getuser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllUser(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRequestUser = createAsyncThunk(
  'admin/getrequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getRequestUser()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getDeletedUser = createAsyncThunk(
  'admin/getdeletuser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getDeleteUser()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getUserById = createAsyncThunk(
  'admin/getuserbyid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getUserById(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteUserById = createAsyncThunk(
  'admin/deleteuserbyid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.deleteUserById(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const restoreUserById = createAsyncThunk(
  'admin/restoreuserbyid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.restoreUserById(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const identifyUserById = createAsyncThunk(
  'admin/identifyuserbyid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.identifyUserById(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllTags = createAsyncThunk(
  'admin/getalltags',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllTags()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addTag = createAsyncThunk(
  'admin/addtag',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.addTag(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editCategory = createAsyncThunk(
  'admin/editcategory',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.editCategory(payload.slug, payload.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'admin/editcategory',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.deleteCategory(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllRole = createAsyncThunk(
  'admin/getallrole',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllRole()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getPermissionByRoleId = createAsyncThunk(
  'admin/getpermissionbyroleid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getPermissionByRoleId(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllPermission = createAsyncThunk(
  'admin/getallpermission',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllPermission()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllJobs = createAsyncThunk(
  'admin/getalljobs',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllJobs(payload)
      console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getListJob = createAsyncThunk(
  'user/getListJob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getListJob(payload)
      console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getJobById = createAsyncThunk(
  'admin/getjobbyid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getJobById(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteJob = createAsyncThunk(
  'admin/deletejob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.deleteJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getJobRequest = createAsyncThunk(
  'admin/getjobrequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getJobRequest()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const identifyJob = createAsyncThunk(
  'admin/identifyjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.identifyJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getDeletedJob = createAsyncThunk(
  'admin/getdeletedjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getDeletedJob()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const restoreJob = createAsyncThunk(
  'admin/restorejob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.restoreJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deletePermanentlyJob = createAsyncThunk(
  'admin/deletepermanentlyjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.deletePermanentlyJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchUser = createAsyncThunk(
  'admin/searchuser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.searchUser(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchCategory = createAsyncThunk(
  'admin/searchcategory',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.searchCategory(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchJob = createAsyncThunk(
  'admin/searchjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.searchJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editRole = createAsyncThunk(
  'admin/editrole',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.editRole(payload.id, payload.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addRole = createAsyncThunk(
  'admin/addrole',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.addRole(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    listUser: [],
    requestUser: [],
    deletedUser: [],
    currentUser: {},
    currentJob: {},
    requestJob: [],
    deletedJob: [],
    tags: [],
    listJobs: [],
    permission: [],
    roleList: [],
    permissionList: [],
    status: '',
    errorMessage: '',
    currentRole: {},
  },
  reducers: {
    logout: (state) => {
      state = undefined
      localStorage.removeItem(storageAdmin.TOKEN)
      sessionStorage.removeItem(storageAdmin.TOKEN)
      return state
    },
    clearState: (state) => {
      state.status = ''
      return state
    },
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload
      return state
    },
  },
  extraReducers: {
    [getAllUser.pending]: (state) => {
      state.status = 'getAllUser.pending'
    },
    [getAllUser.fulfilled]: (state, { payload }) => {
      state.status = 'getAllUser.fulfilled'
      state.listUser = payload
    },
    [getAllUser.rejected]: (state, { payload }) => {
      state.status = 'getAllUser.rejected'
      state.errorMessage = payload.message
    },

    [getListJob.pending]: (state) => {
      state.status = 'getListJob.pending'
    },
    [getListJob.fulfilled]: (state, { payload }) => {
      state.status = 'getListJob.fulfilled'
      state.listUser = payload
    },
    [getListJob.rejected]: (state, { payload }) => {
      state.status = 'getListJob.rejected'
      state.errorMessage = 'loi'
    },
    [getRequestUser.pending]: (state) => {
      state.status = 'getRequestUser.pending'
    },
    [getRequestUser.fulfilled]: (state, { payload }) => {
      state.status = 'getRequestUser.fulfilled'
      state.requestUser = payload
    },
    [getRequestUser.rejected]: (state, { payload }) => {
      state.status = 'getRequestUser.rejected'
      state.errorMessage = payload.message
    },
    [getDeletedUser.pending]: (state) => {
      state.status = 'getDeletedUser.pending'
    },
    [getDeletedUser.fulfilled]: (state, { payload }) => {
      state.status = 'getDeletedUser.fulfilled'
      state.deletedUser = payload.data
    },
    [getDeletedUser.rejected]: (state, { payload }) => {
      state.status = 'getDeletedUser.rejected'
      state.errorMessage = payload.message
    },
    [getUserById.pending]: (state) => {
      state.status = 'getUserById.pending'
    },
    [getUserById.fulfilled]: (state, { payload }) => {
      state.status = 'getUserById.fulfilled'
      state.currentUser = payload
    },
    [getUserById.rejected]: (state, { payload }) => {
      state.status = 'getUserById.rejected'
      state.errorMessage = payload.message
    },
    [deleteUserById.pending]: (state) => {
      state.status = 'deleteUserById.pending'
    },
    [deleteUserById.fulfilled]: (state, { payload }) => {
      state.status = 'deleteUserById.fulfilled'
    },
    [deleteUserById.rejected]: (state, { payload }) => {
      state.status = 'deleteUserById.rejected'
      state.errorMessage = payload.message
    },
    [restoreUserById.pending]: (state) => {
      state.status = 'restoreUserById.pending'
    },
    [restoreUserById.fulfilled]: (state, { payload }) => {
      state.status = 'restoreUserById.fulfilled'
    },
    [restoreUserById.rejected]: (state, { payload }) => {
      state.status = 'restoreUserById.rejected'
      state.errorMessage = payload.message
    },
    [identifyUserById.pending]: (state) => {
      state.status = 'identifyUserById.pending'
    },
    [identifyUserById.fulfilled]: (state, { payload }) => {
      state.status = 'identifyUserById.fulfilled'
    },
    [identifyUserById.rejected]: (state, { payload }) => {
      state.status = 'identifyUserById.rejected'
      state.errorMessage = payload.message
    },
    [getAllTags.pending]: (state) => {
      state.status = 'getAllTags.pending'
    },
    [getAllTags.fulfilled]: (state, { payload }) => {
      state.status = 'getAllTags.fulfilled'
      state.tags = payload
    },
    [getAllTags.rejected]: (state, { payload }) => {
      state.status = 'getAllTags.rejected'
      state.errorMessage = payload.message
    },
    [addTag.pending]: (state) => {
      state.status = 'addTag.pending'
    },
    [addTag.fulfilled]: (state, { payload }) => {
      state.status = 'addTag.fulfilled'
    },
    [addTag.rejected]: (state, { payload }) => {
      state.status = 'addTag.rejected'
      state.errorMessage = payload.message
    },
    [editCategory.pending]: (state) => {
      state.status = 'editCategory.pending'
    },
    [editCategory.fulfilled]: (state, { payload }) => {
      state.status = 'editCategory.fulfilled'
    },
    [editCategory.rejected]: (state, { payload }) => {
      state.status = 'editCategory.rejected'
      state.errorMessage = payload.message
    },
    [deleteCategory.pending]: (state) => {
      state.status = 'deleteCategory.pending'
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.status = 'deleteCategory.fulfilled'
    },
    [deleteCategory.rejected]: (state, { payload }) => {
      state.status = 'deleteCategory.rejected'
      state.errorMessage = payload.message
    },
    [getAllRole.pending]: (state) => {
      state.status = 'getAllRole.pending'
    },
    [getAllRole.fulfilled]: (state, { payload }) => {
      state.status = 'getAllRole.fulfilled'
      state.roleList = payload
    },
    [getAllRole.rejected]: (state, { payload }) => {
      state.status = 'getAllRole.rejected'
      state.errorMessage = payload.message
    },
    [getAllJobs.pending]: (state) => {
      state.status = 'getAllJobs.pending'
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.status = 'getAllJobs.fulfilled'
      state.listJobs = payload
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.status = 'getAllJobs.rejected'
      state.errorMessage = 'loi '
    },
    [getJobById.pending]: (state) => {
      state.status = 'getJobById.pending'
    },
    [getJobById.fulfilled]: (state, { payload }) => {
      state.status = 'getJobById.fulfilled'
      state.currentJob = payload
    },
    [getJobById.rejected]: (state, { payload }) => {
      state.status = 'getJobById.rejected'
      state.errorMessage = payload.message
    },
    [deleteJob.pending]: (state) => {
      state.status = 'deleteJob.pending'
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      state.status = 'deleteJob.fulfilled'
    },
    [deleteJob.rejected]: (state, { payload }) => {
      state.status = 'deleteJob.rejected'
      state.errorMessage = payload.message
    },
    [getJobRequest.pending]: (state) => {
      state.status = 'getJobRequest.pending'
    },
    [getJobRequest.fulfilled]: (state, { payload }) => {
      state.status = 'getJobRequest.fulfilled'
      state.requestJob = payload.data
    },
    [getJobRequest.rejected]: (state, { payload }) => {
      state.status = 'getJobRequest.rejected'
      state.errorMessage = payload.message
    },
    [identifyJob.pending]: (state) => {
      state.status = 'identifyJob.pending'
    },
    [identifyJob.fulfilled]: (state, { payload }) => {
      state.status = 'identifyJob.fulfilled'
      state.requestJob = payload.data
    },
    [identifyJob.rejected]: (state, { payload }) => {
      state.status = 'identifyJob.rejected'
      state.errorMessage = payload.message
    },
    [getDeletedJob.pending]: (state) => {
      state.status = 'getDeletedJob.pending'
    },
    [getDeletedJob.fulfilled]: (state, { payload }) => {
      state.status = 'getDeletedJob.fulfilled'
      state.deletedJob = payload.data
    },
    [getDeletedJob.rejected]: (state, { payload }) => {
      state.status = 'getDeletedJob.rejected'
      state.errorMessage = payload.message
    },
    [restoreJob.pending]: (state) => {
      state.status = 'restoreJob.pending'
    },
    [restoreJob.fulfilled]: (state, { payload }) => {
      state.status = 'restoreJob.fulfilled'
    },
    [restoreJob.rejected]: (state, { payload }) => {
      state.status = 'restoreJob.rejected'
      state.errorMessage = payload.message
    },
    [deletePermanentlyJob.pending]: (state) => {
      state.status = 'deletePermanentlyJob.pending'
    },
    [deletePermanentlyJob.fulfilled]: (state, { payload }) => {
      state.status = 'deletePermanentlyJob.fulfilled'
    },
    [deletePermanentlyJob.rejected]: (state, { payload }) => {
      state.status = 'deletePermanentlyJob.rejected'
      state.errorMessage = payload.message
    },
    [searchUser.pending]: (state) => {
      state.status = 'searchUser.pending'
    },
    [searchUser.fulfilled]: (state, { payload }) => {
      state.status = 'searchUser.fulfilled'
      state.listUser = payload
    },
    [searchUser.rejected]: (state, { payload }) => {
      state.status = 'searchUser.rejected'
      state.errorMessage = payload.message
    },
    [searchCategory.pending]: (state) => {
      state.status = 'searchCategory.pending'
    },
    [searchCategory.fulfilled]: (state, { payload }) => {
      state.status = 'searchCategory.fulfilled'
      state.category = payload
    },
    [searchCategory.rejected]: (state, { payload }) => {
      state.status = 'searchCategory.rejected'
      state.errorMessage = payload.message
    },
    [searchJob.pending]: (state) => {
      state.status = 'searchJob.pending'
    },
    [searchJob.fulfilled]: (state, { payload }) => {
      state.status = 'searchJob.fulfilled'
      state.listJobs = payload
    },
    [searchJob.rejected]: (state, { payload }) => {
      state.status = 'searchJob.rejected'
      state.errorMessage = payload.message
    },
    [getPermissionByRoleId.pending]: (state) => {
      state.status = 'getPermissionByRoleId.pending'
    },
    [getPermissionByRoleId.fulfilled]: (state, { payload }) => {
      state.status = 'getPermissionByRoleId.fulfilled'
      state.permission = payload
    },
    [getPermissionByRoleId.rejected]: (state, { payload }) => {
      state.status = 'getPermissionByRoleId.rejected'
      state.errorMessage = payload.message
    },
    [getAllPermission.pending]: (state) => {
      state.status = 'getAllPermission.pending'
    },
    [getAllPermission.fulfilled]: (state, { payload }) => {
      state.status = 'getAllPermission.fulfilled'
      state.permissionList = payload
    },
    [getAllPermission.rejected]: (state, { payload }) => {
      state.status = 'getAllPermission.rejected'
      state.errorMessage = payload.message
    },
    [editRole.pending]: (state) => {
      state.status = 'editRole.pending'
    },
    [editRole.fulfilled]: (state, { payload }) => {
      state.status = 'editRole.fulfilled'
    },
    [editRole.rejected]: (state, { payload }) => {
      state.status = 'editRole.rejected'
      state.errorMessage = payload.message
    },
    [addRole.pending]: (state) => {
      state.status = 'addRole.pending'
    },
    [addRole.fulfilled]: (state, { payload }) => {
      state.status = 'addRole.fulfilled'
    },
    [addRole.rejected]: (state, { payload }) => {
      state.status = 'addRole.rejected'
      state.errorMessage = payload.message
    },
  },
})

const { actions, reducer } = adminSlice

export const adminSelector = (state) => state.admin

export const { clearState, logout, setCurrentRole } = actions

export default reducer
