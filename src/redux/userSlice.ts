import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../interface/Product.interface'

const initialState: IUser = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
  shopUID: '',
}

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    addUser: (state, action): void => {
      console.log(action.payload)
      const userData: any = action.payload
      state.displayName = userData.displayName
      state.email = userData.email
      state.photoURL = userData.photoURL
      state.uid = userData.uid
      state.shopUID = userData.shopUID
    },
    resetState: () => {
      return initialState
    },
    getUserData: (state, action) => {
      return state
    },
  },
})

export const { actions: userActions } = userReducer
export default userReducer.reducer
