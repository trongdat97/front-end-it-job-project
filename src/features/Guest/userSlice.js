import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/userApi'

export const uploadFile = createAsyncThunk(
  'user/upload',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.uploadFile(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addJob = createAsyncThunk(
  'user/addjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.addJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllTag = createAsyncThunk(
  'user/getalltag',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getAllTag()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getJobByUserId = createAsyncThunk(
  'user/getjobbyuserid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getJobByUserId(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getCv = createAsyncThunk(
  'user/getjobbyuserid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getJobByUserId(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllJob = createAsyncThunk(
  'user/getAllJob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getAllJob(payload)
      console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCvByUsername = createAsyncThunk(
  'user/getCvByUsername',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getCvByUsername(payload)
      return response.data
      console.log(response.data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editJobByJobId = createAsyncThunk(
  'user/editjobbyjobid',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload.data)
      console.log(payload.id)
      const response = await userApi.editJobByJobId(payload.id, payload.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteJobByJobId = createAsyncThunk(
  'user/deletejobbyjobid',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.deleteJobByUserId(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCandidate = createAsyncThunk(
  'user/getcandidate',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getCandidate(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const acceptJob = createAsyncThunk(
  'user/acceptjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.acceptJob(payload.id, payload.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const denyJob = createAsyncThunk(
  'user/denyjob',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.denyJob(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const changePassword = createAsyncThunk(
  'user/changepassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.changePassword(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const changePhone = createAsyncThunk(
  'user/changephone',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.changePhone(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeAvatar = createAsyncThunk(
  'user/changeavatar',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.changeAvatar(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getAllCv = createAsyncThunk(
  'user/getAllCv',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getAllCv(payload)
      console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const postCv = createAsyncThunk(
  'user/postCv',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.postCv(payload)
      console.log('asdasd')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'guest',
  initialState: {
    status: '',
    file: '',
    type: '',
    errorMessage: '',
    jobList: [],
    tagList: [],
    candidateList: [],
    listCv: [],
    cvListByUsername: [],
  },
  reducers: {
    clearState: (state) => {
      state.status = ''
      return state
    },
    setFile: (state, action) => {
      state.file = action.payload
      return state
    },
    setType: (state, action) => {
      state.type = action.payload
    },
  },
  extraReducers: {
    [uploadFile.pending]: (state) => {
      state.status = 'uploadFile.pending'
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      state.status = 'uploadFile.fulfilled'
      state.file = payload.url
    },
    [uploadFile.rejected]: (state, { payload }) => {
      state.status = 'uploadFile.rejected'
      // state.errorMessage = payload.message
    },
    [postCv.pending]: (state) => {
      state.status = 'postCv.pending'
    },
    [postCv.fulfilled]: (state, { payload }) => {
      state.status = 'postCv.fulfilled'
    },
    [postCv.rejected]: (state, { payload }) => {
      state.status = 'postCv.rejected'
      // state.errorMessage = payload.message
    },
    [getAllCv.pending]: (state) => {
      state.status = 'getAllCv.pending'
    },
    [getAllCv.fulfilled]: (state, { payload }) => {
      state.status = 'getAllCv.fulfilled'
      state.file = payload.url
    },
    [getAllCv.rejected]: (state, { payload }) => {
      state.status = 'getAllCv.rejected'
      // state.errorMessage = payload.message
    },
    [getAllJob.pending]: (state) => {
      state.status = 'getAllJob.pending'
    },
    [getAllJob.fulfilled]: (state, { payload }) => {
      state.status = 'getAllJob.fulfilled'
      state.jobList = payload
    },
    [getAllJob.rejected]: (state, { payload }) => {
      state.status = 'getAllJob.rejected'
      // state.errorMessage = payload.message
    },
    [getCvByUsername.pending]: (state) => {
      state.status = 'getCvByUsername.pending'
    },
    [getCvByUsername.fulfilled]: (state, { payload }) => {
      state.status = 'getCvByUsername.fulfilled'
      state.cvListByUsername = payload
    },
    [getCvByUsername.rejected]: (state, { payload }) => {
      state.status = 'getCvByUsername.rejected'
      // state.errorMessage = payload.message
    },
    [addJob.pending]: (state) => {
      state.status = 'addJob.pending'
    },
    [addJob.fulfilled]: (state, { payload }) => {
      state.status = 'addJob.fulfilled'
    },
    [addJob.rejected]: (state, { payload }) => {
      state.status = 'addJob.rejected'
      // state.errorMessage = payload.message
    },
    [getAllTag.pending]: (state) => {
      state.status = 'getAllTag.pending'
    },
    [getAllTag.fulfilled]: (state, { payload }) => {
      state.status = 'getAllTag.fulfilled'
      state.tagList = payload
    },
    [getAllTag.rejected]: (state, { payload }) => {
      state.status = 'getAllTag.rejected'
      //state.errorMessage = payload.message
    },
    [getJobByUserId.pending]: (state) => {
      state.status = 'getJobByUserId.pending'
    },
    [getJobByUserId.fulfilled]: (state, { payload }) => {
      state.status = 'getJobByUserId.fulfilled'
      state.jobList = payload
    },
    [getJobByUserId.rejected]: (state, { payload }) => {
      state.status = 'getJobByUserId.rejected'
      // state.errorMessage = payload.message
    },
    [editJobByJobId.pending]: (state) => {
      state.status = 'editJobByJobId.pending'
    },
    [editJobByJobId.fulfilled]: (state, { payload }) => {
      state.status = 'editJobByJobId.fulfilled'
    },
    [editJobByJobId.rejected]: (state, { payload }) => {
      state.status = 'editJobByJobId.rejected'
      state.errorMessage = payload.message
    },
    [deleteJobByJobId.pending]: (state) => {
      state.status = 'deleteJobByJobId.pending'
    },
    [deleteJobByJobId.fulfilled]: (state, { payload }) => {
      state.status = 'deleteJobByJobId.fulfilled'
    },
    [deleteJobByJobId.rejected]: (state, { payload }) => {
      state.status = 'deleteJobByJobId.rejected'
      state.errorMessage = payload.message
    },
    [getCandidate.pending]: (state) => {
      state.status = 'getCandidate.pending'
    },
    [getCandidate.fulfilled]: (state, { payload }) => {
      state.status = 'getCandidate.fulfilled'
      state.candidateList = payload[0].appliedBy
    },
    [getCandidate.rejected]: (state, { payload }) => {
      state.status = 'getCandidate.rejected'
      state.errorMessage = payload.message
    },
    [acceptJob.pending]: (state) => {
      state.status = 'acceptJob.pending'
    },
    [acceptJob.fulfilled]: (state, { payload }) => {
      state.status = 'acceptJob.fulfilled'
    },
    [acceptJob.rejected]: (state, { payload }) => {
      state.status = 'acceptJob.rejected'
      state.errorMessage = payload.message
    },
    [denyJob.pending]: (state) => {
      state.status = 'denyJob.pending'
    },
    [denyJob.fulfilled]: (state, { payload }) => {
      state.status = 'denyJob.fulfilled'
    },
    [denyJob.rejected]: (state, { payload }) => {
      state.status = 'denyJob.rejected'
      state.errorMessage = payload.message
    },
    [changePassword.pending]: (state) => {
      state.status = 'changePassword.pending'
    },
    [changePassword.fulfilled]: (state, { payload }) => {
      state.status = 'changePassword.fulfilled'
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.status = 'changePassword.rejected'
      state.errorMessage = payload.message
    },
    [changePhone.pending]: (state) => {
      state.status = 'changePhone.pending'
    },
    [changePhone.fulfilled]: (state, { payload }) => {
      state.status = 'changePhone.fulfilled'
    },
    [changePhone.rejected]: (state, { payload }) => {
      state.status = 'changePhone.rejected'
      state.errorMessage = payload.message
    },
    [changeAvatar.pending]: (state) => {
      state.status = 'changeAvatar.pending'
    },
    [changeAvatar.fulfilled]: (state, { payload }) => {
      state.status = 'changeAvatar.fulfilled'
    },
    [changeAvatar.rejected]: (state, { payload }) => {
      state.status = 'changeAvatar.rejected'
      state.errorMessage = payload.message
    },
  },
})

const { actions, reducer } = userSlice

export const userSelector = (state) => state.user

export const { clearState, setFile, setType } = actions

export default reducer
