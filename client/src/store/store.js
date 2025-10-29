import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/couter/fechDataSlice.js'
import orderInfoReducer from './features/order/orderInfoSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orderInfo: orderInfoReducer,
  },
})
