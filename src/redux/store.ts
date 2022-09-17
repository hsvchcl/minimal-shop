import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import userReducer from './userSlice'
import modalReducer from './modalsReducer'

const rootReducers = combineReducers({
  productReducer,
  userReducer,
  modalReducer,
})

export const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== 'production' ? true : false,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
