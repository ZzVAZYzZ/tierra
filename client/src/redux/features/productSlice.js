import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: "",
  productDetail: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:8000/api/products");

    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/add",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Add product failed"
      );
    }
  }
);
export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch product failed"
      );
    }
  }
);

export const queryProductById = createAsyncThunk(
  "product/queryProductById",
  async (id) => {
    const response = await getProductById(id);

    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "successed";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(queryProductById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(queryProductById.fulfilled, (state, action) => {
        state.status = "successed";
        state.productDetail = action.payload;
      })
      .addCase(queryProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "successed";
        // Thêm sản phẩm mới vào danh sách hiện tại
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductsById.pending, (state) => {
        state.status = "loading";
        state.productDetail = {}; // reset chi tiết trước khi fetch
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetail = action.payload; // lưu chi tiết sản phẩm
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.productDetail = {};
      });
  },
});

export default productsSlice.reducer;
export const { resetStatus } = productsSlice.actions;
