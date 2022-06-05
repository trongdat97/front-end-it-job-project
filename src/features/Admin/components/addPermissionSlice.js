import { createSlice } from '@reduxjs/toolkit'

const addPermissionSlice = createSlice({
  name: 'addPermission',
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

const { actions, reducer } = addPermissionSlice

export const addPermissionSelector = (state) => state.addPermission

export const { showInfo, closeInfo } = actions

export default reducer
