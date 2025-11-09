"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import Picture from "../../../assets/images/NKC-2160X900-2-2048x853 1.png";
import nhan5 from "../../../assets/images/Rectangle 16.png";
import Arrow from "../../../assets/icons/arrow";
import { useFetchProducts } from "../../../hook/useFetchProducts";
import { toIntegerVND } from "../utils/price";

export default function Page() {
  const router = useRouter();
  const { products } = useFetchProducts();

  const formatPriceVND = (input) =>
    new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(
      toIntegerVND(input)
    );

  const getMainImage = (item) => {
    const imgs = Array.isArray(item?.ProductImages) ? item.ProductImages : [];
    const main = imgs.find((im) => im?.is_main) || imgs[0];
    return main?.image_url || null;
  };

  const goToProduct = (item) => {
    if (!item) return;
    const id = item?.product_id;
    const cat = String(item?.Category?.name || "").trim().toLowerCase();
    const map = {
      "nhan": "ring",
      "bong tai": "earring",
      "day chuyen": "necklace",
      "vong tay": "bracelet",
    };
    const segment = map[cat] || "ring";
    if (id) router.push(`/${segment}/${id}`);
  };

  const newArrivals = React.useMemo(() => {
    const list = Array.isArray(products) ? [...products] : [];
    list.sort((a, b) => {
      const ta = Date.parse(a?.created_at || 0) || 0;
      const tb = Date.parse(b?.created_at || 0) || 0;
      if (tb !== ta) return tb - ta;
      const ida = Number(a?.product_id) || 0;
      const idb = Number(b?.product_id) || 0;
      return idb - ida;
    });
    return list.slice(0, 4);
  }, [products]);
  
  return (
    <div className="flex flex-col justify-center items-center gap-[200px]">
      {/* banner */}
      <img src={Picture.src} alt="banner" className="w-full" />
      {/* Browse New Arrivals */}
      <div className="flex flex-col gap-[50px]">
        <a className="text-[40px] font-semibold">Browse New Arrivals</a>
        <div className="h-[400px] flex flex-row justify-around gap-[20px]">
          {newArrivals.map((item) => (
            <div
              key={item.product_id}
              onClick={() => goToProduct(item)}
              className="w-[300px] flex flex-col gap-[10px] items-center border border-[#D6D6D6] hover:shadow-xl transition-shadow duration-300 rounded-md cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') goToProduct(item); }}
            >
              <img
                src={getMainImage(item)}
                alt={item?.name}
                className="w-[250px] h-[250px] mt-[18px] object-cover rounded"
              />
              <div className="w-full px-[20px] text-left h-[120px] flex flex-col justify-between">
                <p className="text-[20px] font-medium">{item?.name}</p>
                {(() => {
  const priceInt = toIntegerVND(item?.price);
  const discountInt = toIntegerVND(item?.discount_price);
  const hasDiscount = Number.isFinite(priceInt) && Number.isFinite(discountInt) && discountInt > 0 && discountInt < priceInt;
  const finalPrice = hasDiscount ? Math.max(priceInt - discountInt, 0) : priceInt;
  return hasDiscount ? (
    <div className="flex items-baseline gap-2">
      <span className="text-[16px] font-semibold text-[#9B8D6F]">{formatPriceVND(finalPrice)} ₫</span>
      <span className="text-[14px] text-gray-400 line-through">{formatPriceVND(priceInt)} ₫</span>
    </div>
  ) : (
    <div className="text-[16px] text-[#9B8D6F]">{formatPriceVND(priceInt)} ₫</div>
  );
})()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Together Forever */}
      <div className="flex flex-col gap-[50px] mb-[200px]">
        <a className="text-[40px] font-semibold">Together Forever</a>
        <div className="h-[600px] flex flex-row justify-around gap-[20px]">
            <img src={nhan5.src} alt=""/>
            <div className="w-[600px] flex flex-col justify-between text-black">
                <a className=" text-[48px] font-bold">A</a>
                <a className=" text-[110px] font-extrabold text-[#A18B10]">LOVE</a>
                <a className=" text-[32px] font-bold">STORY WITHOUT LIMITS</a>
                <a className=" text-[32px] font-light my-[10px]">Couple rings are more than jewelry — they symbolize “two hearts, one rhythm.” Each design is crafted with care to reflect your love and celebrate every precious moment together.</a>
                <button className="w-[200px] h-[50px] border-[5px] border-[#A18B10] rounded-[5px] flex flex-row items-center justify-center gap-[10px] cursor-pointer" onClick={()=>{router.push("/ring")}}>
                    <p className=" text-[24px] font-thin">Shop now</p>
                    <Arrow/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}


