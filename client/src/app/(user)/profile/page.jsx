"use client";
import React from "react";
import backIcon from "../../../assets/images/backicon.png";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "../../../assets/icons/user_icon";
import { useDispatch, useSelector } from "react-redux";
import PenIcon from "../../../assets/icons/pen_icon";
import { updateUser } from "../../../redux/features/userSlice";

export default function Page() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState(null);

  const fileInputRef = React.useRef(null);
  const nameInputRef = React.useRef(null);

  React.useEffect(() => {
    if (user && !isEditing) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setAvatarPreview(user.avatar || null);
    }
  }, [user, isEditing]);

  // ✅ Khi click "Chỉnh sửa"
  const clickEdit = () => {
    setIsEditing(true);
  };

  // ✅ Khi click "Sửa tên"
  const handleEditName = () => {
    setIsEditingName(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  // ✅ Khi blur (click ra ngoài input tên)
  const handleBlurName = () => {
    setIsEditingName(false);
    dispatch(updateUser({ name }));
  };

  // ✅ Khi bấm “Cập nhật ảnh đại diện” → mở File Picker
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // ✅ Khi chọn ảnh mới
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatarPreview(imageURL);
      dispatch(updateUser({ avatar: imageURL }));
      // Nếu có API upload ảnh, bạn có thể thêm tại đây
    }
  };

  // ✅ Khi bấm “Lưu thông tin”
  const handleSave = () => {
    dispatch(updateUser({ email, phone, address }));
    setIsEditing(false);
  };

  return (
    <div className="bg-[#E4E4E4] flex justify-center items-center min-h-screen">
      <div className="w-[1100px] min-h-[800px] bg-white mt-[67px] mb-[67px] flex relative flex-col items-center py-[50px] rounded-lg shadow-md">
        {/* Nút quay lại */}
        <Link
          href="/"
          className="absolute top-[37px] left-[36px] cursor-pointer"
        >
          <Image priority src={backIcon} width={25} height={25} alt="back icon" />
        </Link>

        {/* Nội dung chính */}
        <div className="w-[500px] flex flex-col items-center">
          {/* Ảnh đại diện */}
          <div className="border rounded-full w-[150px] h-[150px] overflow-hidden flex items-center justify-center">
            {avatarPreview ? (
              <Image
                width={150}
                height={150}
                src={avatarPreview}
                alt="avatar"
                className="object-cover w-[150px] h-[150px]"
              />
            ) : (
              <UserIcon width={150} height={150} />
            )}
          </div>

          {/* Input file ẩn */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />

          {/* Tên người dùng */}
          <div className="text-[32px] mt-[10px]">
            {isEditingName ? (
              <input
                ref={nameInputRef}
                className="border-b border-gray-400 text-center outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlurName}
              />
            ) : (
              <b>{name || "Username"}</b>
            )}
          </div>

          {/* Các nút chỉnh sửa */}
          <div className="flex flex-col items-center mt-[20px]">
            {isEditing ? (
              <>
                <button
                  onClick={handleEditName}
                  className="flex items-center justify-center w-[100px] h-[35px] bg-[#D9D9D9] text-[15px] cursor-pointer rounded-[4px] mb-[10px]"
                >
                  Sửa tên
                </button>
                <button
                  onClick={handleAvatarClick}
                  className="flex items-center justify-center w-[230px] h-[35px] bg-[#D9D9D9] text-[15px] cursor-pointer rounded-[4px] mb-[20px]"
                >
                  Cập nhật ảnh đại diện
                </button>
              </>
            ) : (
              <button
                onClick={clickEdit}
                className="flex items-center justify-center w-[260px] h-[40px] bg-[#D9D9D9] text-[15px] cursor-pointer rounded-[4px] mb-[20px]"
              >
                Chỉnh sửa thông tin người dùng
              </button>
            )}
          </div>

          {/* Thông tin chi tiết */}
          <div className="flex flex-col gap-[25px] w-full">
            {/* Email */}
            <div className="w-full">
              <span className="text-[24px]">Email</span>
              {isEditing ? (
                <div className="w-[500px] h-[50px] border font-thin px-[18px] relative flex items-center">
                  <input
                    className="w-full h-full outline-none pr-10"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <PenIcon width={18} height={18} />
                  </div>
                </div>
              ) : (
                <div className="w-[500px] h-[50px] border leading-[50px] font-thin px-[18px]">
                  <span>{user?.email || "Chưa có email"}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="w-full">
              <span className="text-[24px]">Số điện thoại</span>
              {isEditing ? (
                <div className="w-[500px] h-[50px] border font-thin px-[18px] relative flex items-center">
                  <input
                    className="w-full h-full outline-none pr-10"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <PenIcon width={18} height={18} />
                  </div>
                </div>
              ) : (
                <div className="w-[500px] h-[50px] border leading-[50px] font-thin px-[18px]">
                  <span>{user?.phone || "Chưa có số điện thoại"}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="w-full">
              <span className="text-[24px]">Địa chỉ</span>
              {isEditing ? (
                <div className="w-[500px] h-[50px] border font-thin px-[18px] relative flex items-center">
                  <input
                    className="w-full h-full outline-none pr-10"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <PenIcon width={18} height={18} />
                  </div>
                </div>
              ) : (
                <div className="w-[500px] h-[50px] border leading-[50px] font-thin px-[18px]">
                  <span>{user?.address || "Chưa có địa chỉ"}</span>
                </div>
              )}
            </div>
          </div>

          {/* Nút Lưu */}
          {isEditing && (
            <button
              onClick={handleSave}
              className="flex items-center justify-center w-[180px] h-[45px] bg-[#9B8D6F] text-white mt-[50px] rounded-[6px] cursor-pointer hover:bg-[#8A7E63] transition-all"
            >
              LƯU THÔNG TIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
