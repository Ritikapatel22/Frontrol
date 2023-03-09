import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/authslice'
import {
  accessReducer,
  listenerMiddleware,
  TabSlice,
} from '@frontrolinc/pace-ui-framework'
import { appApi } from './appApi'
import portfolioReducer from '../slices/portfolioslice'
import viewReducer from '../slices/viewslice'
import projectReducer from '../slices/projectSlice'
import projectListReducer from '../slices/projectListSlice'
import reports from '../slices/reportslice'
import shared from "../slices/sharedslice";
const reducer = {
  auth: accessReducer,
  loginAuth: loginReducer,
  [appApi.reducerPath]: appApi.reducer,
  portfolio: portfolioReducer,
  view: viewReducer,
  project: projectReducer,
  projectList: projectListReducer,
  reports: reports,
  tabSlice: TabSlice.reducer,
  shared,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .concat(appApi.middleware),
})

export default store