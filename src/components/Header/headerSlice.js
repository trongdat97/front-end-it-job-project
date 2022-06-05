import { createSlice } from '@reduxjs/toolkit'
import adminApi from 'api/adminApi'
import storageAdmin from 'constants/storageAdmin'

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    isOpenDrawer: true,
    isAuth: false,
  },
  reducers: {
    changeState: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer
      return state
    },
    getAuth: (state) => {
      state.isAuth = Boolean(
        localStorage.getItem(storageAdmin.TOKEN) ||
          sessionStorage.getItem(storageAdmin.TOKEN)
      )
      return state
    },
  },
  extraReducers: {},
})

const { actions, reducer } = headerSlice

export const headerSelector = (state) => state.header

export const { changeState, getAuth } = actions

export default reducer
