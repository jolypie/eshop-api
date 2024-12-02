import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../components/Product";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },

    remove(state, action: PayloadAction<number>) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
