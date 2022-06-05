import { createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    type: '',
    value: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.type = action.payload.type
      state.value = action.payload.value
      return state
    },
    clearSearch: (state) => {
      state.type = ''
      state.value = ''
      return state
    },
  },
  extraReducers: {},
})

const { actions, reducer } = searchSlice

export const searchSelector = (state) => state.search

export const { setSearch, clearSearch } = actions

export default reducer
