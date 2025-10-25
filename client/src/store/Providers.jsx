"use client";
import React from "react";
import { ProductsProvider } from "./productsStore.jsx";

export default function Providers({ children }) {
  return <ProductsProvider>{children}</ProductsProvider>;
}

