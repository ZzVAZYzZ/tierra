"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProducts, selectProductsState } from "../../../../store/features/couter/fechDataSlice.js";
import { toIntegerVND } from "../../utils/price";
import CheckIcon from "../../../../assets/icons/check_icon.js";

const formatPriceVND = (input) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(toIntegerVND(input));

export default function Page() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(selectProductsState);
  const params = useParams();
  const ringId = params?.necklaceId;

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = React.useMemo(() => {
    return Array.isArray(products)
      ? products.find((p) => String(p?.product_id) === String(ringId))
      : undefined;
  }, [products, ringId]);

  const images = Array.isArray(product?.ProductImages) ? product.ProductImages : [];
  const mainImage = images.find((im) => im?.is_main) || images[0];

  const addToCart = () => {
    if (!product) return;
    const item = {
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      discount_price: product.discount_price,
      quantity: 1,
      selected: true,
      image_url: mainImage?.image_url || (images[0]?.image_url || ""),
    };
    try {
      const raw = localStorage.getItem("cart_items");
      const list = raw ? JSON.parse(raw) : [];
      let found = false;
      const updated = Array.isArray(list)
        ? list.map((it) => {
            if (String(it.product_id) === String(item.product_id)) {
              found = true;
              return { ...it, quantity: (Number(it.quantity) || 1) + 1, selected: true };
            }
            return it;
          })
        : [];
      const next = found ? updated : [...updated, item];
      localStorage.setItem("cart_items", JSON.stringify(next));
    alert("da them vao gio")
    } catch {}
  };

  return (
    <div className="w-full flex justify-center mt-6 mb-12">
      <div className="w-[90%] max-w-[1200px]">
        {status === "failed" && (
          <div className="p-4 text-sm text-red-500">Lỗi tải dữ liệu: {String(error)}</div>
        )}

        {(status === "loading" || status === "idle") && (
          <div className="p-4 text-sm text-gray-500">Đang tải sản phẩm...</div>
        )}

        {status === "succeeded" && product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {mainImage?.image_url && (
                <img
                  src={mainImage.image_url}
                  alt={product.name}
                  className="w-full h-[420px] object-cover rounded-md border"
                />
              )}
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.map((img) => (
                    <img
                      key={img.image_id}
                      src={img.image_url}
                      alt={product.name}
                      className={`h-[80px] w-full object-cover rounded border ${
                        img.image_id === mainImage?.image_id ? "ring-2 ring-[#9B8D6F]" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-[#3A3A3A]">{product.name}</h1>
              {(() => {
                const priceInt = toIntegerVND(product.price);
                const discountInt = toIntegerVND(product.discount_price);
                const hasDiscount = Number.isFinite(priceInt) && Number.isFinite(discountInt) && discountInt > 0 && discountInt < priceInt;
                const finalPrice = hasDiscount ? Math.max(priceInt - discountInt, 0) : priceInt;
                return hasDiscount ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-[#9B8D6F]">{formatPriceVND(finalPrice)} ₫</span>
                    <span className="text-base text-gray-400 line-through">{formatPriceVND(priceInt)} ₫</span>
                  </div>
                ) : (
                  <div className="text-xl text-[#9B8D6F]">{formatPriceVND(priceInt)} ₫</div>
                );
              })()}
              <div className=" w-[80px] text-sm font-bold">
                Chất liệu
                <div className=" h-[30px] flex justify-center items-center border rounded-[8px] mt-[20px] font-normal">
                  {product.material === "vang" ? <>Vàng</> : <>Kim cương</>}
                </div>
              </div>
              <div className=" text-sm font-bold">
                Màu
                <div className="mt-[10px] flex items-center gap-3">
                  {(() => {
                    const current = String(product.color || "").toLowerCase();
                    const colors = [
                      { key: "trang", hex: "#D6D6D6" },
                      { key: "vang", hex: "#F1DC87" },
                      { key: "hong", hex: "#F2BAA8" },
                    ];
                    return colors.map((color) => (
                      <div key={color.key} className="w-[40px] h-[40px] rounded-[8px] border border-gray-300 relative" style={{ backgroundColor: color.hex }}>
                        {(current === color.key || (color.key === "hong" && current.includes("hong"))) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CheckIcon />
                          </div>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div className=" text-sm font-bold">
                Tồn kho: {Number.isFinite(product.stock_quantity) ? product.stock_quantity : "?"}
              </div>

              <div className="mt-2 flex gap-4">
                <button onClick={addToCart} className=" w-[260px] h-[60px] text-[24px] rounded bg-white border border-black cursor-pointer">Thêm vào giỏ</button>
                <button className=" w-[260px] h-[60px] text-[24px] rounded border border-[#9B8D6F] text-white bg-[#9B8D6F]">Mua ngay</button>
              </div>
            </div>
            <div className=" flex flex-col gap-[20px]">
              <div className=" text-[32px] font-medium">Giới thiệu về sản phẩm</div>
              <div className=" text-[24px] font-extralight">{product.description}</div>
            </div>
          </div>
        )}

        {status === "succeeded" && !product && (
          <div className="p-4 text-sm text-gray-500">Không tìm thấy sản phẩm</div>
        )}
      </div>
    </div>
  );
}


