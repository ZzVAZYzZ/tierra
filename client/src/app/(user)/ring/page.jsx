"use client";
import React from "react";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import { toIntegerVND } from "../utils/price";
import { useFetchProducts } from "../../../hook/useFetchProducts";


const parsePrice = toIntegerVND;

const Page = () => {
  const { products, loading, error } = useFetchProducts()
  const [favorites, setFavorites] = React.useState([]);

  // Filter & sort state
  const [priceRange, setPriceRange] = React.useState(""); // "2"|"2"|"3"|"4"
  const [color, setColor] = React.useState(""); // "5"|"6"|"7"
  const [material, setMaterial] = React.useState(""); // "8"|"9"
  const [sortBy, setSortBy] = React.useState(""); // """", "priceAsc","priceDesc","nameAsc"

  // danh sách được lọc + sắp xếp
  const displayedData = React.useMemo(() => {
    let list = Array.isArray(products) ? [...products] : [];

    list = list.filter((item) => {
      const cat = item?.Category?.name || "";
      return String(cat).trim().toLowerCase() === "nhan";
    });

    // phạm vi lọc theo giá
    if (priceRange) {
      let min = 0, max = Infinity;

      if (priceRange.includes("-")) {
        const [minStr, maxStr] = priceRange.split("-");
        min = Number(minStr);
        max = Number(maxStr);
      } else {
        if (priceRange === "1") {
          min = 0;
          max = 20;
        } else if (priceRange === "2") {
          min = 20;
          max = 30;
        } else if (priceRange === "3") {
          min = 30;
          max = 40;
        } else if (priceRange === "4") {
          min = 40;
          max = 100;
        }
      }
      list = list.filter((item) => {
        const price = parsePrice(item.price);
        return price >= min * 1_000_000 && price <= max * 1_000_000;
      });
    }

    // lọc theo màu
    if (color) {
      let colorName = color;
      if (color === "5") colorName = "Vang";
      else if (color === "6") colorName = "Vang hong";
      else if (color === "7") colorName = "Trang";
      list = list.filter(
        (item) => String(item.color).toLowerCase() === String(colorName).toLowerCase()
      );
    }

    // lọc theo chất liệu
    if (material) {
      let materialName = material;
      if (material === "8") materialName = "vang";
      else if (material === "9") materialName = "kim cuong";
      list = list.filter(
        (item) => String(item.material).toLowerCase() === String(materialName).toLowerCase()
      );
    }

    // sắp xêp
    if (sortBy === "priceAsc") {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "priceDesc") {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "nameAsc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, priceRange, color, material, sortBy]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Handlers passed to child components
  const handlePriceChange = (value) => setPriceRange(value);
  const handleColorChange = (value) => setColor(value);
  const handleMaterialChange = (value) => setMaterial(value);
  const handleSortChange = (value) => setSortBy(value);

  return (
    <div className=" flex flex-col items-center gap-[30px] mt-[40px]">
      <div className=" w-[90%]">
        <p className=" text-[32px] text-[#9B8D6F] text-left">Nhẫn</p>
      </div>
      <div className="w-[90%] flex flex-row gap-[50px]">
        {/* Filters */}
        <Filters
          priceRange={priceRange}
          color={color}
          material={material}
          sortBy={sortBy}
          onPriceRangeChange={handlePriceChange}
          onColorChange={handleColorChange}
          onMaterialChange={handleMaterialChange}
          onSortChange={handleSortChange}
        />

        {/* ProductGrid */}
        <div className="flex-1">
          {status === "loading" && (
            <div className="p-4 text-sm text-gray-500">Đang tải sản phẩm…</div>
          )}
          {status === "failed" && (
            <div className="p-4 text-sm text-red-500">Lỗi tải dữ liệu: {String(error)}</div>
          )}
          <ProductGrid
            products={displayedData}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

