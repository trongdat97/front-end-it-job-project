import { createSlice } from '@reduxjs/toolkit'

const permissionInfoSlice = createSlice({
  name: 'permissionInfo',
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

const { actions, reducer } = permissionInfoSlice

export const permissionInfoSelector = (state) => state.permissionInfo

export const { showInfo, closeInfo } = actions

export default reducer
