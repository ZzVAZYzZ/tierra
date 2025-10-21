import React from "react";
import Link from "next/link";
import LocationIcon from "../assets/icons/location_icon";
import PhoneIcon from "../assets/icons/phone_icon";
import DgNavLogo from "../assets/icons/dg_nav_logo";
import HeartIcon from "../assets/icons/heart_icon";
import CartIcon from "../assets/icons/cart_icon";
import BillIcon from "../assets/icons/bill_icon";
import UserIcon from "../assets/icons/user_icon";
import SearchIcon from "../assets/icons/search_icon";

const Nav = () => {
  return (
    <div className="flex flex-col">
      {/* make color */}
      <div className="h-[30px] bg-[#9B8D6F]"></div>
      {/* about */}
      <div className=" h-[100px] flex flex-row items-center justify-between mx-[65px]">
        <div className="flex flex-row items-center justify-center gap-[15px]">
          <a href="#">
            <LocationIcon />
          </a>
          <a href="#">
            <PhoneIcon />
          </a>
          <p>028 7939 3939</p>
        </div>
        <div>
          <Link href={"/home"}>
            <DgNavLogo />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center gap-[70px]">
          <div className="flex flex-row items-center justify-center gap-[18px]">
            <a href="#">
              <HeartIcon />
            </a>
            <a href="#">
              <CartIcon />
            </a>
            <a href="#">
              <BillIcon />
            </a>
            <a href="#">
              <UserIcon />
            </a>
          </div>
          <div className="h-[20px] flex flex-row justify-center gap-[24px]">
            <div>
              <a href="#">Về chúng tôi</a>
            </div>
            <div className=" flex flex-row items-center gap-[7px] leading-[20px]">
              <button className="cursor-pointer">EN</button>
              <hr className="h-[80%] border"></hr>
              <button className="cursor-pointer">VI</button>
            </div>
          </div>
        </div>
      </div>
      {/* hr */}
      <hr className="h-[2px] bg-[#9B8D6F] border-[white]"></hr>
      {/* menubar */}
      <div className="h-[100px] flex flex-row justify-between items-center mx-[70px]">
        <Link href={"/ring"}>Nhẫn</Link>
        <Link href={"/earring"}>Bông tai</Link>
        <Link href={"/necklace"}>Dây chuyền</Link>
        <Link href={"/bracelet"}>Vòng tay</Link>
        <div><a>Ưu đãi</a></div>
        <div className="w-[350px] h-[50px] border rounded-full flex items-center px-5">
            <input className="flex-1 outline-none placeholder-[#C0C0C0]" placeholder="Tìm kiếm"></input>
            <SearchIcon/>
        </div>
      </div>
      <hr className="h-[2px] bg-[#9B8D6F] border-[white]"></hr>
    </div>
  );
};

export default Nav;
