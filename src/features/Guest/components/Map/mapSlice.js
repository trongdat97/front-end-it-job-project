import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    onSubmit: undefined,
    latitude: null,
    longitude: null,
    address: null,
    status: '',
    errorMessage: '',
  },
  reducers: {
    showForm: (state, action) => {
      state.onSubmit = action.payload.onSubmit
      return state
    },
    closeForm: (state) => {
      state.onSubmit = undefined
      return state
    },
    setCoordinate: (state, action) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
      return state
    },
    setAddress: (state, action) => {
      state.address = action.payload.address
      return state
    },
  },
  extraReducers: {},
})

const { actions, reducer } = mapSlice

export const mapSelector = (state) => state.map

export const { showForm, closeForm, setCoordinate, setAddress } = actions

export default reducer
