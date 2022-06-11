import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

const candidateFormSlice = createSlice({
  name: 'candidateForm',
  initialState: {
    onSubmit: undefined,
    type: '',
    status: '',
    errorMessage: '',
  },
  reducers: {
    showCandidateForm: (state, action) => {
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

const { actions, reducer } = candidateFormSlice

export const candidateFormSelector = (state) => state.candidateForm

export const { showCandidateForm, closeForm, setCurrent } = actions

export default reducer
