import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

const jobFormSlice = createSlice({
  name: 'jobForm',
  initialState: {
    onSubmit: undefined,
    type: '',
    status: '',
    currentJob: {},
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
    setCurrent: (state, action) => {
      state.currentJob = action.payload
      return state
    },
  },
  extraReducers: {},
})

const { actions, reducer } = jobFormSlice

export const jobFormSelector = (state) => state.jobForm

export const { setType, showForm, closeForm, setCurrent } = actions

export default reducer
