import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

const cvFormSlice = createSlice({
  name: 'cvForm',
  initialState: {
    onSubmit: undefined,
    type: '',
    status: '',
    currentCv: {},
    errorMessage: '',
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload
    },
    showFormCv: (state, action) => {
      state.onSubmit = action.payload.onSubmit
      return state
    },
    closeForm: (state) => {
      state.onSubmit = undefined
      return state
    },
    setCurrent: (state, action) => {
      console.log(action)
      state.currentCv = action.payload
      return state
    },
  },
  extraReducers: {},
})

const { actions, reducer } = cvFormSlice

export const cvFormSelector = (state) => state.cvForm

export const { setType, showFormCv, closeForm, setCurrent } = actions

export default reducer
