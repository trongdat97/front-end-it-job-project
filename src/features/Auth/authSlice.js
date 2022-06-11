import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'
import userApi from 'api/userApi'
import axios from 'axios'
import storageAdmin from 'constants/storageAdmin'
import storageUser from 'constants/storageUser'

export const adminLogin = createAsyncThunk(
  'admin/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.login(payload)
      const role = response.data.roles.map((item) => {
        return item.name
      })
      console.log(role[0])
      if (role[0] === 'ROLE_ADMIN') {
        if (payload.remember) {
          localStorage.setItem(storageAdmin.TOKEN, response.data.token)
        } else {
          sessionStorage.setItem(storageAdmin.TOKEN, response.data.token)
        }
        return response.data
      }
      return rejectWithValue({ message: "Please enter admin's account" })
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getProfile = createAsyncThunk(
  'user/info',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getProfile()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.message ? error : error.response.data)
    }
  }
)

export const userLogin = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.login(payload)
      console.log(response)
      if (payload.remember) {
        localStorage.setItem(storageUser.TOKEN, response.data.accessToken)
      } else {
        sessionStorage.setItem(storageUser.TOKEN, response.data.accessToken)
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllCity = createAsyncThunk(
  'user/getallcity',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://vapi.vnappmob.com/api/province')
      return response?.data?.results
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const signupContributor = createAsyncThunk(
  'user/signupcontributor',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.signup(payload)
      return response?.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    id: '',
    info: {},
    roleId: null,
    status: '',
    errorMessage: '',
    cityList: [],
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
  },
  extraReducers: {
    [adminLogin.pending]: (state) => {
      state.status = 'adminLogin.pending'
    },
    [adminLogin.fulfilled]: (state, { payload }) => {
      state.status = 'adminLogin.fulfilled'
      state.email = payload.email
      state.id = payload.id
      state.roleId = payload.roleId
    },
    [adminLogin.rejected]: (state, { payload }) => {
      state.status = 'adminLogin.rejected'
      // state.errorMessage = payload.message
    },
    [getProfile.pending]: (state) => {
      state.status = 'getProfile.pending'
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      state.status = 'getProfile.fulfilled'
      state.info = payload[0]
    },
    [getProfile.rejected]: (state, { payload }) => {
      state.status = 'getProfile.rejected'
      state.errorMessage = 'looix'
    },
    [userLogin.pending]: (state) => {
      state.status = 'userLogin.pending'
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.status = 'userLogin.fulfilled'
      state.email = payload.email
      state.id = payload.id
      state.roleId = payload.roleId
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.status = 'userLogin.rejected'
      //state.errorMessage = payload.message
    },
    [signupContributor.pending]: (state) => {
      state.status = 'signupContributor.pending'
    },
    [signupContributor.fulfilled]: (state, { payload }) => {
      state.status = 'signupContributor.fulfilled'
      state.email = payload.email
      state.id = payload.id
      state.roleId = payload.roleId
    },
    [signupContributor.rejected]: (state, { payload }) => {
      state.status = 'signupContributor.rejected'
      //state.errorMessage = payload.message
    },
    [getAllCity.pending]: (state) => {
      state.status = 'getAllCity.pending'
    },
    [getAllCity.fulfilled]: (state, { payload }) => {
      state.status = 'getAllCity.fulfilled'
      state.cityList = payload
    },
    [getAllCity.rejected]: (state, { payload }) => {
      state.status = 'getAllCity.rejected'
      state.errorMessage = payload.message
    },
  },
})

const { actions, reducer } = authSlice

export const authSelector = (state) => state.auth

export const { clearState, logout } = actions

export default reducer
