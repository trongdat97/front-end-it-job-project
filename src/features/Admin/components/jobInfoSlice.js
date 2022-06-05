import { createSlice } from '@reduxjs/toolkit'

const jobInfoSlice = createSlice({
  name: 'jobInfo',
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

const { actions, reducer } = jobInfoSlice

export const jobInfoSelector = (state) => state.jobInfo

export const { showInfo, closeInfo } = actions

export default reducer
