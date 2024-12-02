import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Product from "../components/Product";
import StatusCode from "../utils/StatusCode";

interface ProductState {
  data: Product[];
  status: any;
}

const initialState: ProductState = {
  data: [],
  status: StatusCode.IDLE,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const result: Product[] = await response.json();
  return result;
});

