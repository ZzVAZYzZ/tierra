"use client";
import React, { useState } from "react";
import useAddProduct from "../../../../hook/usePostProduct";

const Page = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    material: "",
    category_id: "",
    price: 1000, // default
    discount_price: 100,
    stock_quantity: 10,
    status: "active",
    color: "",
    main_index: Number(0),
  });

  const [images, setImages] = useState([null, null, null, null, null]);
  const { addProduct, loading, error, success } = useAddProduct();

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async () => {
    const hasAllImages = images.every((img) => img !== null);
    if (!hasAllImages) {
      alert("Vui lòng tải lên đủ 5 hình ảnh!");
      return;
    }
    await addProduct(form, images);
  };

  return (
    <div className="w-full h-full bg-white rounded-[10px] p-6 flex flex-row gap-6">
      {/* ================= DIV TRÁI ================= */}
      <div className="w-[65%] flex flex-col gap-6">
        {/* Tên sản phẩm */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Tên sản phẩm</h2>
          <input
            className="border rounded-[8px] px-4 py-2 w-full outline-none focus:border-[#9B8D6F]"
            placeholder="Nhẫn Kim cương"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>

        {/* Chất liệu & Màu sắc */}
        <div className="flex flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-medium mb-2">Chất liệu</h3>
            <div className="border rounded-[8px] p-4 flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  name="material"
                  value="Vàng"
                  onChange={handleChange}
                />{" "}
                Vàng
              </label>
              <label>
                <input
                  type="radio"
                  name="material"
                  value="Kim cương"
                  onChange={handleChange}
                />{" "}
                Kim cương
              </label>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-medium mb-2">Màu sắc</h3>
            <div className="border rounded-[8px] p-4 flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  name="color"
                  value="Trắng"
                  onChange={handleChange}
                />{" "}
                Trắng
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="Vàng"
                  onChange={handleChange}
                />{" "}
                Vàng
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="Vàng Hồng"
                  onChange={handleChange}
                />{" "}
                Vàng Hồng
              </label>
            </div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <h3 className="font-medium mb-2">Mô tả sản phẩm</h3>
          <textarea
            className="border rounded-[8px] p-4 w-full h-[300px] outline-none focus:border-[#9B8D6F]"
            placeholder="Nhập mô tả sản phẩm..."
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      {/* ================= DIV PHẢI ================= */}
      <div className="w-[35%] flex flex-col gap-3">
        {/* Hình ảnh sản phẩm */}
        <div>
          <h3 className="font-medium mb-2">Hình ảnh sản phẩm</h3>
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <label
                key={index}
                className="w-[100px] h-[100px] flex justify-center items-center border rounded-[8px] cursor-pointer overflow-hidden hover:border-[#9B8D6F]"
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">+</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </label>
            ))}
          </div>
        </div>

        {/*Phân loại sản phẩm */}
        <div className="flex flex-col h-[30%]">
          <h3 className="font-medium mb-2">Phân loại sản phẩm</h3>
          <div className="border rounded-[8px] p-4 flex flex-col gap-2">
            <label>
              <input
                type="radio"
                name="category_id"
                value="3c40c725-8858-487e-9c4f-bc0fff68273d"
                onChange={handleChange}
              />{" "}
              Nhẫn
            </label>
            <label>
              <input
                type="radio"
                name="category_id"
                value="Kim cương"
                onChange={handleChange}
              />{" "}
              Dây chuyền
            </label>
            <label>
              <input
                type="radio"
                name="category_id"
                value="Vàng"
                onChange={handleChange}
              />{" "}
              Vòng tay
            </label>
            <label>
              <input
                type="radio"
                name="category_id"
                value="Kim cương"
                onChange={handleChange}
              />{" "}
              Bông tai
            </label>
          </div>
        </div>

        {/* Button tạo sản phẩm */}
        <div className="flex ">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#9B8D6F] cursor-pointer text-white py-3 rounded-[8px] font-semibold shadow-md hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tạo sản phẩm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
