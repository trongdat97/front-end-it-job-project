import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/authSlice'
import snackbarReducer from 'components/CustomSnackBar/snackbarSlice'
import dialogReducer from 'components/ConfirmDialog/dialogSlice'
import headerReducer from 'components/Header/headerSlice'
import adminReducer from 'features/Admin/adminSlice'
import userInfoReducer from 'features/Admin/components/userInfoSlice'
import tagFormReducer from 'components/TagForm/tagFormSlice'
import jobInfoReducer from 'features/Admin/components/jobInfoSlice'
import permissionInfoReducer from 'features/Admin/components/permissionInfoSlice'
import searchReducer from 'components/SearchBox/searchSlice'
import userReducer from 'features/User/userSlice'
import jobFormReducer from 'features/User/components/JobForm/jobFormSlice'
import mapReducer from 'features/User/components/Map/mapSlice'
import jobDetailsReducer from 'features/User/components/JobDetails/jobDetailsSlice'
import candidateFormReducer from 'features/User/components/CandidateForm/candidateFormSlice'
import editPermissionReducer from 'features/Admin/components/editPermissionSlice'
import addPermissionReducer from 'features/Admin/components/addPermissionSlice'

const rootReducer = {
  auth: authReducer,
  snackbar: snackbarReducer,
  dialog: dialogReducer,
  header: headerReducer,
  admin: adminReducer,
  userInfo: userInfoReducer,
  jobInfo: jobInfoReducer,
  permissionInfo: permissionInfoReducer,
  tagForm: tagFormReducer,
  search: searchReducer,
  user: userReducer,
  jobForm: jobFormReducer,
  map: mapReducer,
  jobDetails: jobDetailsReducer,
  candidateForm: candidateFormReducer,
  editPermission: editPermissionReducer,
  addPermission: addPermissionReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
