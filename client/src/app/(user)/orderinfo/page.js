"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormField from "./components/FormField.jsx";
import {
  selectOrderInfo,
  setField,
  initFromLocal,
  saveToLocal,
} from "../../../redux/features/orderInfoSlice.js";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useSelector(selectOrderInfo);

  const [errors, setErrors] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(initFromLocal());
  }, [dispatch]);

  const onChange = (key) => (e) => {
    const value = e.target?.value ?? "";
    dispatch(setField({ key, value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Vui lòng nhập họ và tên";
    if (!form.phone.trim()) next.phone = "Vui lòng nhập số điện thoại";
    if (!form.province.trim()) next.province = "Bắt buộc";
    if (!form.district.trim()) next.district = "Bắt buộc";
    if (!form.ward.trim()) next.ward = "Bắt buộc";
    if (!form.street.trim()) next.street = "Bắt buộc";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e?.preventDefault?.();
    if (!validate()) return;
    dispatch(saveToLocal(form));
    setShowModal(true);
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
            {/* Nút quay lại */}
            <button
              onClick={() => router.back()}
              className="text-[22px] leading-none w-8 h-8 flex items-center justify-center -ml-1 hover:opacity-80"
              aria-label="Quay lại"
              title="Quay lại"
            >
              ←
            </button>

            <div className="text-center text-2xl font-semibold mt-2 mb-6">
              Thông tin đặt hàng
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Thông tin người mua */}
              <div>
                <div className="text-lg font-medium mb-3">Thông tin người mua</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    placeholder="Họ và tên"
                    value={form.fullName}
                    onChange={onChange("fullName")}
                    required
                    error={errors.fullName}
                  />
                  <FormField
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={onChange("phone")}
                    required
                    error={errors.phone}
                  />
                  <FormField
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                  />
                  <FormField
                    placeholder="Sinh nhật"
                    type="date"
                    value={form.birthday}
                    onChange={onChange("birthday")}
                  />
                </div>
              </div>

              {/* Địa chỉ nhận hàng */}
              <div>
                <div className="text-lg font-medium mb-3">Địa chỉ nhận hàng</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    placeholder="Nhập tỉnh/thành"
                    value={form.province}
                    onChange={onChange("province")}
                    required
                    error={errors.province}
                  />
                  <FormField
                    placeholder="Nhập quận/huyện"
                    value={form.district}
                    onChange={onChange("district")}
                    required
                    error={errors.district}
                  />
                  <FormField
                    placeholder="Nhập phường/xã"
                    value={form.ward}
                    onChange={onChange("ward")}
                    required
                    error={errors.ward}
                  />
                  <FormField
                    placeholder="Nhập địa chỉ khu phố"
                    value={form.street}
                    onChange={onChange("street")}
                    required
                    error={errors.street}
                  />
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div>
                <div className="text-lg font-medium mb-3">Phương thức thanh toán</div>
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
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={form.payment === "card"}
                      onChange={onChange("payment")}
                    />
                    Thanh toán thẻ
                  </label>
                  <label className="flex items-center gap-3">
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

              {/* Ghi chú */}
              <div>
                <div className="text-lg font-medium mb-3">
                  Ghi chú đơn hàng (không bắt buộc)
                </div>
                <FormField
                  textarea
                  value={form.note}
                  onChange={onChange("note")}
                  placeholder="Ghi chú đơn hàng (không bắt buộc)"
                />
              </div>

              {/* Nút đặt hàng */}
              <div className=" pt-2">
                <button
                  type="submit"
                  className="min-w-full md:w-[280px] h-[44px] rounded-full bg-[#9B8D6F] text-white font-medium cursor-pointer hover:opacity-90 transition"
                >
                  Đặt hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal thông báo thành công */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center w-[90%] max-w-[400px]">
            <h2 className="text-xl font-semibold mb-3 text-[#3A3A3A]">
              🎉 Đặt hàng thành công!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm để xác nhận đơn hàng.
            </p>
            <button
              onClick={closeModal}
              className="w-full h-[40px] rounded-full bg-[#9B8D6F] text-white font-medium hover:opacity-90 transition"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
