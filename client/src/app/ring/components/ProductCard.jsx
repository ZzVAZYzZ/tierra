"use client";
import React from "react";
import HeartIcon from "../../../assets/icons/heart_icon";
import { toIntegerVND } from "../utils/price";
import { useRouter } from "next/navigation";

const formatPriceVND = (input) =>
  new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(
    toIntegerVND(input)
  );

const ProductCard = ({ item, isFavorite, onToggleFavorite }) => {
  const router = useRouter();
  
  const goToDetail = () => {
    if (item?.product_id) router.push(`/ring/${item.product_id}`);
  };

  return (
    <div
      className="w-[250px] h-[350px] flex flex-col justify-around border border-[#D6D6D6] hover:shadow-xl transition-shadow duration-300 rounded-md cursor-pointer relative"
      onClick={goToDetail}
    >
      {item?.ProductImages?.map((img, idx) => (
        <div key={idx}>{img.is_main === true && <img src={img.image_url} />}</div>
      ))}
      <div className="text-[20px] font-medium ml-[15px]">{item?.name}</div>
      <div className="text-[16px] text-[#C0C0C0] mt-[20px] mb-[10px] ml-[15px]">{formatPriceVND(item?.price)}</div>
      <button
        type="button"
        aria-label="Yêu thích"
        className=" absolute top-[10px] right-[10px]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite?.();
        }}
      >
        <HeartIcon isFavorite={isFavorite} onClick={() => {}} />
      </button>
    </div>
  );
};

export default ProductCard;
