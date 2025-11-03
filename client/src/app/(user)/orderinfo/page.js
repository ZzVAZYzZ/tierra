"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormField from "./components/FormField.jsx";
import axios from "axios";
import {
  selectOrderInfo,
  setField,
  setAll,
  initFromLocal,
  saveToLocal,
  selectCartTotal,
} from "../../../redux/features/orderInfoSlice.js";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useSelector(selectOrderInfo);
  const { user } = useSelector((state) => state.user);
  const cartTotal = useSelector(selectCartTotal);
  const [localTotal, setLocalTotal] = React.useState(0);

  const [errors, setErrors] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(initFromLocal());
  }, [dispatch]);
  const formatVND = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Math.max(0, Number(n || 0)));

  // Prefill form từ thông tin user nếu có
  React.useEffect(() => {
    if (!user) return;
    const updates = {};
    if (user.name && !form.fullName) updates.fullName = user.name;
    if (user.email && !form.email) updates.email = user.email;
    if (user.phone && !form.phone) updates.phone = user.phone;
    if (user.address && !form.address) updates.address = user.address;
    if (Object.keys(updates).length) {
      dispatch(setAll({ ...form, ...updates }));
    }
  }, [user, form.fullName, form.email, form.phone, form.address, dispatch]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_total");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!isNaN(parsed)) {
          setLocalTotal(parsed);
          dispatch(setField({ key: "cartTotal", value: parsed })); // lưu luôn vào redux
        }
      }
    } catch (e) {
      console.error("Không thể đọc tổng tiền:", e);
    }
  }, [dispatch]);

  const onChange = (key) => (e) => {
    const value = e.target?.value ?? "";
    dispatch(setField({ key, value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName?.trim()) next.fullName = "Vui lòng nhập họ và tên";
    if (!form.phone?.trim()) next.phone = "Vui lòng nhập số điện thoại";
    if (!form.address?.trim()) next.address = "Vui lòng nhập địa chỉ";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validate()) return;

    dispatch(saveToLocal(form));

    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem("cart_items")
          : "[]";
      const list = raw ? JSON.parse(raw) : [];
      const selected = Array.isArray(list)
        ? list.filter((it) => it.selected)
        : [];
      if (selected.length === 0) {
        setErrors((prev) => ({
          ...prev,
          submit: "Vui lòng chọn ít nhất 1 sản phẩm trong giỏ hàng.",
        }));
        return;
      }

      const orderDetails = selected.map((it) => ({
        product_id: it.product_id,
        product_name: it.name || it.product_name || "Sản phẩm",
        quantity: Number(it.quantity) || 1,
        unit_price: Number(it.price) || Number(it.unit_price) || 0,
        discount: Number(it.discount_price) || Number(it.discount) || 0,
      }));

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : "";
      const resp = await axios.post(
        "http://localhost:8000/api/orders/makeOrder",
        {
          shipping_address: String(form.address || "").trim(),
          total_amount: localTotal || cartTotal,
          orderDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (resp && resp.status >= 200 && resp.status < 300) {
        try {
          localStorage.setItem("cart_items", JSON.stringify([]));
          localStorage.removeItem("cart_total"); // 🧹 Xóa tổng tiền sau khi đặt hàng
        } catch {}
        setShowModal(true);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Đặt hàng thất bại";
      setErrors((prev) => ({ ...prev, submit: String(msg) }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/home");
  };

  return (
    <div className="w-full flex justify-center mt-6 mb-12">
      <div className="w-[90%] max-w-[1100px]">
        <div className="bg-[#ECECEC] rounded-xl p-4">
          <div className="bg-white rounded-xl border p-6 md:p-8 shadow-sm relative">
            <button
              onClick={() => router.back()}
              className="text-[22px] leading-none w-8 h-8 flex items-center justify-center -ml-1 hover:opacity-80 cursor-pointer"
              aria-label="Quay lại"
              title="Quay lại"
            >
              {"<"}
            </button>

            <div className="text-center text-2xl font-semibold mt-2 mb-6">
              Thông tin đặt hàng
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Thông tin người mua */}
              <div>
                <div className="text-lg font-medium mb-3">
                  Thông tin người mua
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">Họ và tên</div>
                    <FormField
                      placeholder="Họ và tên"
                      value={form.fullName}
                      onChange={onChange("fullName")}
                      required
                      error={errors.fullName}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">
                      Email <span className="text-red-500">*</span>
                    </div>
                    <FormField
                      placeholder="Email"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">
                      Số điện thoại <span className="text-red-500">*</span>
                    </div>
                    <FormField
                      placeholder="Số điện thoại"
                      value={form.phone}
                      onChange={onChange("phone")}
                      required
                      error={errors.phone}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">
                      Địa chỉ <span className="text-red-500">*</span>
                    </div>
                    <FormField
                      placeholder="Địa chỉ"
                      value={form.address}
                      onChange={onChange("address")}
                      required
                      error={errors.address}
                    />
                  </div>
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div>
                <div className="text-lg font-medium mb-3">
                  Phương thức thanh toán
                </div>
                <div className="space-y-2 text-[14px] text-[#3A3A3A]">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.payment === "cod"}
                      onChange={onChange("payment")}
                    />
                    Thanh toán khi nhận hàng (COD)
                  </label>
                  <label
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      router.push("#");
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={form.payment === "card"}
                      onChange={onChange("payment")}
                    />
                    Thanh toán thẻ
                  </label>
                  <label
                    className="flex items-center gap-3"
                    onClick={() => {
                      router.push("#");
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={form.payment === "bank"}
                      onChange={onChange("payment")}
                    />
                    Thanh toán chuyển khoản
                  </label>
                </div>
              </div>

              {errors.submit && (
                <div className="text-sm text-red-600">{errors.submit}</div>
              )}

              {/* Nút đặt hàng */}
              <button
                type="submit"
                className="w-full h-[56px] rounded-full bg-[#9B8D6F] text-white font-semibold cursor-pointer hover:opacity-90 transition"
              >
                Đặt hàng
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal thông báo thành công */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center w-[90%] max-w-[400px]">
            <h2 className="text-xl font-semibold mb-3 text-[#3A3A3A]">
              Đặt hàng thành công!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm.
            </p>
            <button
              onClick={closeModal}
              className="w-full h-[40px] rounded-full bg-[#9B8D6F] text-white font-medium hover:opacity-90 transition"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
