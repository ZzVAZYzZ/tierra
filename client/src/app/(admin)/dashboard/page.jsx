"use client";

import { useFetchProducts } from "../../../hook/useFetchProducts";
import React, { Suspense } from "react";

export default function page() {
  const { products, status, error } = useFetchProducts();
  if (status === "successed") {
    console.log({ products, status });
  }

  return <div>page</div>;
}
