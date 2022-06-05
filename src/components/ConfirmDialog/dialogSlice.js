import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    onSubmit: undefined,
    message: '',
  },
  reducers: {
    showDialog: (state, action) => {
      state.onSubmit = action.payload.onSubmit
      state.message = action.payload.message
      return state
    },
    closeDialog: (state) => {
      state.onSubmit = undefined
      return state
    },
  },
})

const { actions, reducer } = dialogSlice

export const dialogSelector = (state) => state.dialog

export const { showDialog, closeDialog } = actions

export default reducer
