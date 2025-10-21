import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './couter/fechDataSlice.js'

export const store = configureStore({
  reducer: {
    counter: productsSlice,
  },
})