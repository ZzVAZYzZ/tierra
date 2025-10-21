"use client";
import React from "react";

const Filters = ({
  priceRange,
  color,
  material,
  sortBy,
  onPriceRangeChange,
  onColorChange,
  onMaterialChange,
  onSortChange,
}) => {
  return (
    <div className=" flex flex-col gap-[11px]">
      <p className="text-[24px]">Bộ lọc</p>
      <div
        className="flex flex-col gap-2 ml-[20px] text-[15px]"
        style={{ accentColor: "black" }}
      >
        {/* loc theo gia tien */}
        <p className="text-[20px]">Theo giá</p>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="priceGroup"
            value="1"
            checked={priceRange === "1"}
            onChange={(e) =>
              onPriceRangeChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Từ 10 triệu đến 20 triệu</p>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="priceGroup"
            value="2"
            checked={priceRange === "2"}
            onChange={(e) =>
              onPriceRangeChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Từ 20 triệu đến 30 triệu</p>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="priceGroup"
            value="3"
            checked={priceRange === "3"}
            onChange={(e) =>
              onPriceRangeChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Từ 30 triệu đến 40 triệu</p>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="priceGroup"
            value="4"
            checked={priceRange === "4"}
            onChange={(e) =>
              onPriceRangeChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Từ 40 triệu đến 100 triệu</p>
        </label>
        {/* loc theo mau sac */}
        <p className="text-[20px]">Màu sắc</p>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="colorGroup"
            value="5"
            checked={color === "5"}
            onChange={(e) =>
              onColorChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 appearance-none w-[13] h-[13] border-2 border-[#F1DC87] checked:bg-[#F1DC87] cursor-pointer"
          />
          <p>Vàng</p>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="colorGroup"
            value="6"
            checked={color === "6"}
            onChange={(e) =>
              onColorChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 appearance-none w-[13] h-[13] border-2 border-[#F2BAA8] checked:bg-[#F2BAA8] cursor-pointer"
          />
          <p>Vàng hồng</p>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="colorGroup"
            value="7"
            checked={color === "7"}
            onChange={(e) =>
              onColorChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 appearance-none w-[13] h-[13] border-2 border-[#D6D6D6] checked:bg-[#D6D6D6] cursor-pointer"
          />
          <p>Trắng</p>
        </label>
        {/* loc theo chat lieu */}
        <p className="text-[20px]">Chất liệu</p>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="materialGroup"
            value="8"
            checked={material === "8"}
            onChange={(e) =>
              onMaterialChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Vàng</p>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="materialGroup"
            value="9"
            checked={material === "9"}
            onChange={(e) =>
              onMaterialChange?.(e.target.checked ? e.target.value : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Kim cương</p>
        </label>
      </div>

      <p className="text-[24px]">Sắp xếp</p>
      <div className="flex flex-col gap-2" style={{ accentColor: "black" }}>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="sortGroup"
            value="priceAsc"
            checked={sortBy === "priceAsc"}
            onChange={(e) => onSortChange?.(e.target.checked ? "priceAsc" : "")}
            className="mr-2 cursor-pointer"
          />
          <p>Giá từ thấp đến cao</p>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="sortGroup"
            value="priceDesc"
            checked={sortBy === "priceDesc"}
            onChange={(e) =>
              onSortChange?.(e.target.checked ? "priceDesc" : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Giá từ cao đến thấp</p>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="sortGroup"
            value="bestSeller"
            checked={sortBy === "bestSeller"}
            onChange={(e) =>
              onSortChange?.(e.target.checked ? "bestSeller" : "")
            }
            className="mr-2 cursor-pointer"
          />
          <p>Bán chạy</p>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="sortGroup"
            value="nameAsc"
            checked={sortBy === "nameAsc"}
            onChange={(e) => onSortChange?.(e.target.checked ? "nameAsc" : "")}
            className="mr-2 cursor-pointer"
          />
          <p>A-Z</p>
        </label>
      </div>
    </div>
  );
};

export default Filters;
