import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    isOpen: false,
  },
  reducers: {
    showInfo: (state) => {
      state.isOpen = true
      return state
    },
    closeInfo: (state) => {
      state.isOpen = false
      return state
    },
  },
})

const { actions, reducer } = userInfoSlice

export const userInfoSelector = (state) => state.userInfo

export const { showInfo, closeInfo } = actions

export default reducer
