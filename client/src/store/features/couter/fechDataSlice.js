

const initialState = {
  // value: 0,
  // data: [],
  // status: "idle",
  // error: "",
  products: [],
  status: "idle",
  error: "",
  productDetail: {}
}

export const fetchProducts = createAsyncThunk(
    'API/postTransaction',
    async () => {
        // const responseData = await axios.get('')
        const response = await getAllProducts();
        // console.log(response);

        return response;
    },
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state,action)=>{
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.status = "successed";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error;
      })
  },
  
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export default counterSlice.reducer

export default productsSlice.reducer