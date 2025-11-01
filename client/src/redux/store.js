import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productSlice';
import userReducer from './features/userSlice';
import orderInfoReducer from "./features/orderInfoSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    orderInfo: orderInfoReducer,
  },
})