"use client";
import MenuAdminIcon from "../../../assets/icons/admin/menu_admin_icon";
import AddIcon from "../../../assets/icons/admin/add_icon";
import DoanthuIcon from "../../../assets/icons/admin/doanthu_icon";
import ArvatarIcon from "../../../assets/icons/admin/arvatar_icon";
import QuanlyIcon from "../../../assets/icons/admin/quanly_icon";

import React, { useEffect } from "react";
import Link from "next/link";

import { useRedirect } from "../../..//hook/useRedirect";
import LogoutIcon from "../../../assets/icons/admin/logout_icon";
import { useAuth } from "../../../hook/useAuth";
import { useDispatch } from "react-redux";
import { resetUserState } from "../../../redux/features/userSlice";
import { useRouter } from "next/navigation";

import {House} from 'lucide-react'

const Nav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useAuth();
  useRedirect();
  const handleLogout = async () => {
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      // 🧠 Gọi API logout để xoá refreshToken trong DB + cookie
      await fetch(`${backendUrl}/api/users/logout`, {
        method: "POST",
        credentials: "include", // gửi cookie
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 🧹 Xóa token phía client (nếu bạn lưu ở localStorage / sessionStorage)
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");

      // 🧹 Xóa state user trong Redux (nếu bạn có reducer)
      // dispatch(logoutUser()); // nếu có action logout

      dispatch(resetUserState());
      router.push("/home");
    } catch (error) {
      console.error("❌ Lỗi khi đăng xuất:", error);
      alert("Đăng xuất thất bại!");
    }
  };
  return (
    <nav className=" w-[250px] h-full flex flex-col justify-between items-start relative bg-white rounded-[10px] py-[42px] pl-[22px]">
      <div className=" absolute w-[80%] border border-[#D9D9D9] top-8"></div>
      <div className=" flex flex-col gap-4 justify-center items-start">
        <Link href={"/dashboard"}>
          <div className=" flex flex-row gap-3.5 cursor-pointer justify-center items-center">
            <MenuAdminIcon />
            <p>Quản lý sản phẩm</p>
          </div>
        </Link>
        <div className=" flex flex-row gap-3.5 cursor-pointer  justify-center items-center">
          <DoanthuIcon />
          <p>Doanh thu</p>
        </div>
        <div className=" flex flex-row gap-5 cursor-pointer  justify-center items-center">
          <QuanlyIcon />
          <p>Quản lý đơn hàng</p>
        </div>
      </div>
      <div className=" flex flex-col gap-3 justify-center items-start">
        <div className=" flex flex-row gap-3.5 cursor-pointer justify-center items-center">
          <ArvatarIcon />
          <p>Admin</p>
        </div>
        <div onClick={()=>{router.push('/')}} className=" flex flex-row gap-3.5 cursor-pointer justify-center items-center">
          <House />
          <p>User Homepage</p>
        </div>
        <div
          className=" flex flex-row gap-6 cursor-pointer justify-center items-center ml-[3px]"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <p>Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
