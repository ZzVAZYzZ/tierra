"use client";
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, favorites, onToggleFavorite }) => {
  const count = Array.isArray(products) ? products.length : 0;
  return (
    <div className="flex flex-col mb-[50px] gap-[25px]">
      <p>Hiện có {count} sản phẩm</p>
      <div className=" min-w-[1030px] grid grid-cols-4 gap-[30px]">
        {products?.map((item, index) => (
          <ProductCard
            key={index}
            item={item}
            isFavorite={favorites?.includes(item.product_id)}
            onToggleFavorite={() => onToggleFavorite?.(item.product_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

