import { createSlice } from '@reduxjs/toolkit'
import { IModalDisplay } from '../interface/Product.interface'

const initialState: IModalDisplay = {
  modalEditProduct: false,
  modalUserInfo: false,
}

export const modalReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    openCloseUserInfoModal: (state, action) => {
      console.log(action.payload);
      state.modalUserInfo = action.payload
    },
  },
})

export const { actions: modalActions } = modalReducer
export default modalReducer.reducer
