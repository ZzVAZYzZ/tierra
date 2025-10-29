import MenuAdminIcon from "../../../assets/icons/admin/menu_admin_icon";
import AddIcon from "../../../assets/icons/admin/add_icon";
import DoanthuIcon from "../../../assets/icons/admin/doanthu_icon";
import ArvatarIcon from "../../../assets/icons/admin/arvatar_icon";
import QuanlyIcon from "../../../assets/icons/admin/quanly_icon";

import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className=" w-[250px] h-full flex flex-col justify-between items-start relative bg-white rounded-[10px] py-[42px] pl-[22px]">
      <div className=" absolute w-[80%] border border-[#D9D9D9] top-8"></div>
      <div className=" flex flex-col gap-4 justify-center items-start">
        <Link href={"/dashboard"}>
          <div className=" flex flex-row gap-3.5 cursor-pointer justify-center items-center">
            <MenuAdminIcon />
            <p>Tất cả sản phẩm</p>
          </div>
        </Link>
        <div className=" flex flex-row gap-3.5 cursor-pointer  justify-center items-center">
          <DoanthuIcon />
          <p>Doanh thu</p>
        </div>
        <Link href={"/dashboard/postProduct"}>
          <div className=" flex flex-row gap-6 cursor-pointer justify-center items-center">
            <AddIcon />
            <p>Quản lý sản phẩm</p>
          </div>
        </Link>
        <div className=" flex flex-row gap-5 cursor-pointer  justify-center items-center">
          <QuanlyIcon />
          <p>Quản lý đơn hàng</p>
        </div>
      </div>
      <div className=" flex flex-row gap-3.5 cursor-pointer justify-center items-center">
        <ArvatarIcon />
        <p>Quản lý sản phẩm</p>
      </div>
    </nav>
  );
};

export default Nav;
