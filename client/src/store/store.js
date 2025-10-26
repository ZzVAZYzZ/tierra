import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/couter/fechDataSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})
