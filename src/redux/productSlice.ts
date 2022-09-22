import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../interface/Product.interface'

const initialState: IProduct[] = []

export const productReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addProduct: (state, action): void => {
      return state = action.payload;
    },
    deleteUser: (state, action) => {
      const taskFound = state.find((el) => el.id === action.payload)
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1)
      }
    },
    editProduct: (state, action) => {
      const {
        id,
        productName,
        productDescription,
        productPrice,
        productImageUrl,
      } = action.payload

      const productFound = state.find((el) => el.id === id)
      if (productFound) {
        productFound.productName = productName
        productFound.productDescription = productDescription
        productFound.productPrice = parseInt(productPrice)
        productFound.productImageUrl = String(productImageUrl)
      }
    },
  },
})

export const { actions: productActions } = productReducer
export default productReducer.reducer
