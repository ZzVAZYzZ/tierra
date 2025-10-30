"use client";

import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../../../hook/useFetchProducts";
import NavPage from "../components/navPage";
import BachamIcon from "../../../assets/icons/admin/bacham_icon";
import Link from "next/link";
import useFetchProductById from "../../../hook/useGetProductById";

export default function Page() {
  const { products, status, error } = useFetchProducts();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const { fetchProductById, detailProduct, loadingDetailProduct } =
    useFetchProductById();

  // Hàm định dạng ngày kiểu Việt Nam
  function formatDateVN(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Toggle menu khi nhấn vào nút ba chấm
  const toggleMenu = (index) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".product-row")) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (status === "successed") {
    console.log({ products, status });
  }

  return (
    <div className="w-full h-full flex flex-col ml-2.5 gap-[12px]">
      <NavPage />
      <div className="w-full h-full bg-white rounded-[10px] flex flex-col px-[72px] pt-[52px] pb-[47px]">
        {/* Wrapper có thể cuộn */}
        <div className="w-full flex flex-col">
          {/* Tiêu đề bảng */}
          <div className="w-full min-h-[50px] flex flex-row justify-start items-center">
            <div className="w-[7%]">Stt</div>
            <div className="w-[19%]">Sản phẩm</div>
            <div className="w-[15%]">Ngày tạo</div>
            <div className="w-[15%]">Lượt mua</div>
            <div className="w-[20%]">Lượt bình luận/đánh giá</div>
            <div className="w-[20%]">Trạng thái tạo sản phẩm</div>
            <button className="h-[40px] w-[40px] bg-[#9B8D6F] shadow-[0px_4px_15px_rgba(0,0,0,0.2)] cursor-pointer rounded-[8px] flex justify-center items-center"></button>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="flex flex-col h-[400px] overflow-y-auto gap-[7px]">
            {status === "successed" &&
              products &&
              products.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="product-row relative flex flex-row w-full bg-[#EDEDED] min-h-[80px] rounded-[8px] items-center pl-[16px] pr-[40px]"
                  >
                    <div className="w-[5%]">{index + 1}</div>
                    <div
                      className="w-[21%] font-medium truncate"
                      title={item.name}
                    >
                      {item.name}
                    </div>
                    <div className="w-[17%]">
                      {formatDateVN(item.created_at)}
                    </div>
                    <div className="w-[20%]">140 lượt</div>
                    <div className="w-[25%]">10 đánh giá</div>
                    <div className="w-[10%] text-green-600">{item.status}</div>

                    {/* Nút ba chấm */}
                    <div
                      className="w-[4%] cursor-pointer relative flex justify-end"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(index);
                      }}
                    >
                      <BachamIcon />

                      {/* Menu thả xuống */}
                      {openMenuIndex === index && (
                        <div className="absolute right-0 top-[100%] mt-2 w-[200px] bg-white shadow-lg rounded-[6px] border border-gray-200 z-10">
                          <Link href={`/dashboard/update/${item.product_id}`}>
                            <button
                              onClick={() => fetchProductById(item.product_id)}
                              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left text-sm"
                            >
                              ✏️ Chỉnh sửa sản phẩm
                            </button>
                          </Link>
                          <button
                            onClick={() => console.log("Xóa:", item.name)}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left text-sm text-red-600"
                          >
                            🗑️ Xóa sản phẩm
                          </button>
                          <button
                            onClick={() =>
                              console.log("Xem đánh giá:", item.name)
                            }
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left text-sm"
                          >
                            👁️ Xem đánh giá
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Xem tất cả */}
        <div className="w-full h-[15%] cursor-pointer flex justify-center items-center">
          See all
        </div>
      </div>
    </div>
  );
}
