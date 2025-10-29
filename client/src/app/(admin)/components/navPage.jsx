import TimKiemIcon from "../../../assets/icons/admin/timKiem_icon";
import LichIcon from "../../../assets/icons/admin/lich_icon";
import DaucongIcon from "../../../assets/icons/admin/daucong_icon";

import React from "react";

const NavPage = () => {
  const today = new Date();
  const day = today.getDate(); // Ngày
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthText = months[today.getMonth()];
  return (
    <header className="w-full h-[70px] bg-white rounded-[10px] flex flex-row justify-between items-center px-[25px] py-3">
      <div className="w-[100px] h-[45px] bg-[#9B8D6F] shadow-[0px_4px_15px_rgba(0,0,0,0.4)] rounded-[8px] flex justify-center items-center text-white  text-[15px] gap-[2px]">
        <div className=" cursor-context-menu">
          {day},{monthText}
        </div>
        <LichIcon />
      </div>
      <div className="flex flex-row gap-[25px] items-center">
        {/* Input có icon nằm bên phải bên trong */}
        <div className="relative w-[300px] h-[45px]">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="w-full h-full rounded-xl border border-black pl-[17px] pr-[45px] focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <TimKiemIcon />
          </div>
        </div>

        <div className="w-[200px] h-[45px] bg-[#9B8D6F] flex justify-center items-center shadow-[0px_4px_15px_rgba(0,0,0,0.4)] rounded-[8px] flex justify-center items-center text-white gap-[5px] cursor-pointer text-[15px]">
          <DaucongIcon />
          <div>Tạo sản phẩm</div>
        </div>
      </div>
    </header>
  );
};

export default NavPage;
