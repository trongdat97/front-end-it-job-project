import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

const jobDetailsSlice = createSlice({
  name: 'jobDetails',
  initialState: {
    onSubmit: undefined,
    type: '',
    status: '',
    errorMessage: '',
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload
    },
    showForm: (state, action) => {
      state.onSubmit = action.payload.onSubmit
      return state
    },
    closeForm: (state) => {
      state.onSubmit = undefined
      return state
    },
  },
  extraReducers: {},
})

const { actions, reducer } = jobDetailsSlice

export const jobDetailsSelector = (state) => state.jobDetails

export const { setType, showForm, closeForm } = actions

export default reducer
