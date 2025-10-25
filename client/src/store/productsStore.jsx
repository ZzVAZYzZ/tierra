"use client";
import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const initialState = {
  products: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  productDetail: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, status: "loading", error: null };
    case "FETCH_SUCCESS":
      return { ...state, status: "succeeded", products: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, status: "failed", error: action.payload };
    // case "SET_PRODUCT_DETAIL":
    //   return { ...state, productDetail: action.payload };
    // case "CLEAR_PRODUCT_DETAIL":
    //   return { ...state, productDetail: null };
    default:
      return state;
  }
}

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = useCallback(async () => {
    // Avoid refetch if already loading
    if (state.status === "loading") return;
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("http://localhost:8000/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log(data);
      
      dispatch({ type: "FETCH_SUCCESS", payload: Array.isArray(data) ? data : [] });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err?.message || "Fetch failed" });
    }
  }, [state.status]);

  // const setProductDetail = useCallback((product) => {
  //   dispatch({ type: "SET_PRODUCT_DETAIL", payload: product });
  // }, []);

  // const clearProductDetail = useCallback(() => {
  //   dispatch({ type: "CLEAR_PRODUCT_DETAIL" });
  // }, []);

  const value = useMemo(
    () => ({
      ...state,
      fetchProducts,
      // setProductDetail,
      // clearProductDetail,
    }),
    // [state, fetchProducts, setProductDetail, clearProductDetail]
    [state, fetchProducts]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within ProductsProvider");
  return context;
}

