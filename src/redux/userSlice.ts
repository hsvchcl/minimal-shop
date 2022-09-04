import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interface/Product.interface";

const initialState: IProduct[] = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      const taskFound = state.find((el) => el.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    }
  }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
