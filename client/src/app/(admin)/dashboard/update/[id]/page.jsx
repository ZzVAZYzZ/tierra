"use client";
import React, { useEffect, useState } from "react";
import useFetchProductById from "../../../../../hook/useGetProductById";
import { useSelector } from "react-redux";
import useUpdateProduct from "../../../../../hook/useUpdateProduct";
import { useParams } from "next/navigation";

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
  });

  const [images, setImages] = useState([null, null, null, null, null]);
  const { updateProduct, loading, error, success } = useUpdateProduct();
  const { productDetail } = useSelector((item) => item.products);
  const { id: product_id } = useParams();

  const { fetchProductById } = useFetchProductById();
  useEffect(() => {
    fetchProductById(product_id);
  }, []);
  // ✅ Hàm chuyển URL thành File
  const urlToFile = async (url, filename = "image.png") => {
    const response = await fetch(url);
    const blob = await response.blob();
    const ext = blob.type.split("/")[1]; // lấy phần mở rộng tự động (png, jpeg)
    return new File([blob], `${filename}.${ext}`, { type: blob.type });
  };
  useEffect(() => {
    const convertImages = async () => {
      if (productDetail) {
        // ✅ Set form nếu có dữ liệu
        setForm((prev) => ({
          ...prev,
          name: productDetail.name,
          description: productDetail.description,
          material: productDetail.material,
          color: productDetail.color,
          category_id: productDetail.category_id,
          price: productDetail.price,
          stock_quantity: productDetail.stock_quantity,
          discount_price: productDetail.discount_price,
          status: productDetail.status,
        }));

        // ✅ Chuẩn bị mảng hình tối đa 5 phần tử
        const imgArray = Array(5).fill(null);
        const promises = productDetail.ProductImages?.map(async (item, idx) => {
          if (idx < 5) {
            // Nếu là URL, chuyển thành File
            return await urlToFile(item.image_url, `image_${idx}`);
          }
          return null;
        });

        // Chờ tất cả promise hoàn thành
        const files = await Promise.all(promises || []);
        // Gắn đúng vị trí
        files.forEach((file, idx) => {
          imgArray[idx] = file || null;
        });

        setImages(imgArray); // ✅ bây giờ images là dạng File[]
      }
    };

    convertImages();
  }, [productDetail]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file; // cập nhật đúng vị trí index
      return newImages;
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async () => {
    await updateProduct(productDetail.product_id, form, images);
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

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
            defaultValue={productDetail.name}
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
                  value="vang"
                  checked={form.material === "vang"}
                  onChange={handleChange}
                />
                Vàng
              </label>
              <label>
                <input
                  type="radio"
                  name="material"
                  value="kim cuong"
                  checked={form.material === "kim cuong"}
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
                  value="trang"
                  checked={form.color === "trang"}
                  onChange={handleChange}
                />
                Trắng
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="vang"
                  checked={form.color === "vang"}
                  onChange={handleChange}
                />{" "}
                Vàng
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="vang hong"
                  checked={form.color === "vang hong"}
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
            defaultValue={productDetail.description}
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
                  typeof img === "string" ? (
                    <img src={img} className="w-full h-full object-cover" /> // Link từ server
                  ) : (
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-full object-cover"
                    /> // File vừa upload
                  )
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
                checked={
                  form.category_id === "3c40c725-8858-487e-9c4f-bc0fff68273d"
                }
                onChange={handleChange}
              />{" "}
              Nhẫn
            </label>
            <label>
              <input
                type="radio"
                name="category_id"
                value="00382bcd-1a1c-474b-8b81-e54313502ab5"
                checked={
                  form.category_id === "00382bcd-1a1c-474b-8b81-e54313502ab5"
                }
                onChange={handleChange}
              />{" "}
              Dây chuyền
            </label>
            <label>
              <input
                type="radio"
                name="category_id"
                value="4c032dd3-1384-46e4-85f6-c29bbe303605"
                checked={
                  form.category_id === "4c032dd3-1384-46e4-85f6-c29bbe303605"
                }
                onChange={handleChange}
              />{" "}
              Vòng tay
            </label>
            <label>
              <input
                type="radio"
                name="category_id"
                value="e0f055ec-3ce2-416b-8151-920a20802c0b"
                checked={
                  form.category_id === "e0f055ec-3ce2-416b-8151-920a20802c0b"
                }
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
            {loading ? "Đang xử lý..." : "Cập nhật sản phẩm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
