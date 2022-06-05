import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    isSnackbarOpen: false,
    message: '',
    type: '',
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.isSnackbarOpen = true
      state.message = action.payload.message
      state.type = action.payload.type
      return state
    },
    hideSnackbar: (state) => {
      state.isSnackbarOpen = false
      state.message = ''
      state.type = ''
      return state
    },
  },
})

const { actions, reducer } = snackbarSlice

export const snackbarSelector = (state) => state.snackbar

export const { showSnackbar, hideSnackbar } = actions

export default reducer
