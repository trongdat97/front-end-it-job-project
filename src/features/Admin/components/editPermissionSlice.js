import { createSlice } from '@reduxjs/toolkit'

const editPermissionSlice = createSlice({
  name: 'editPermission',
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

const { actions, reducer } = editPermissionSlice

export const editPermissionSelector = (state) => state.editPermission

export const { showInfo, closeInfo } = actions

export default reducer
