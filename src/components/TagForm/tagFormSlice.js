import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

export const getOneCategory = createAsyncThunk(
  'categoryform/getonecategory',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getOneCategory(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const tagFormSlice = createSlice({
  name: 'tagForm',
  initialState: {
    onSubmit: undefined,
    currentTag: {},
    parentList: [],
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
    setCurrent: (state, action) => {
      state.currentTag = action.payload
      return state
    },
  },
  extraReducers: {
    [getOneCategory.pending]: (state) => {
      state.status = 'getOneCategory.pending'
    },
    [getOneCategory.fulfilled]: (state, { payload }) => {
      state.status = 'getOneCategory.fulfilled'
      state.currentCategory = payload
    },
    [getOneCategory.rejected]: (state, { payload }) => {
      state.status = 'getOneCategory.rejected'
      state.errorMessage = payload.message
    },
  },
})

const { actions, reducer } = tagFormSlice

export const tagFormSelector = (state) => state.tagForm

export const { setType, showForm, closeForm, setCurrent } = actions

export default reducer
