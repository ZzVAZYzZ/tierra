"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import Picture from "../../../assets/images/NKC-2160X900-2-2048x853 1.png";
import nhan1 from "../../../assets/images/RI-4945-OV125-SET-YELLOW-1MAIN 1.png";
import nhan2 from "../../../assets/images/RI-6632-RO200-SET-WHITE-1MAIN 1.png";
import nhan3 from "../../../assets/images/RI-6713-RO020-SET-YELLOW-1MAIN 1.png";
import nhan4 from "../../../assets/images/RI-9215-RO010-SET-YELLOW-1MAIN 1.png";
import nhan5 from "../../../assets/images/Rectangle 16.png";
import Arrow from "../../../assets/icons/arrow";


export default function Page() {
  const [data] = React.useState([
    {
      hinh: nhan1,
      mieuta: "18K Yellow Accented Solitaire Ring",
      gia: "4.990.000",
    },
    {
      hinh: nhan2,
      mieuta: "18K White Accented Solitaire Ring",
      gia: "5.990.000",
    },
    {
      hinh: nhan3,
      mieuta: "18K Yellow Three Stone Ring",
      gia: "7.990.000",
    },
    {
      hinh: nhan4,
      mieuta: "18K Yellow Three Stone Ring",
      gia: "3.990.000",
    },
  ]);
  const router = useRouter();
  
  return (
    <div className="flex flex-col justify-center items-center gap-[200px]">
      {/* banner */}
      <img src={Picture.src} alt="banner" className="w-full" />
      {/* Browse New Arrivals */}
      <div className="flex flex-col gap-[50px]">
        <a className="text-[40px] font-semibold">Browse New Arrivals</a>
        <div className="h-[400px] flex flex-row justify-around gap-[20px]">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[300px] flex flex-col gap-[10px] items-center border border-[#D6D6D6] hover:shadow-xl transition-shadow duration-300 rounded-md cursor-pointer"
            >
              <img
                src={item.hinh.src}
                alt={item.mieuta}
                className="w-[250px] h-[250px] mt-[18px]"
              />
              <div className="w-full px-[20px] text-left h-[120px] flex flex-col justify-between">
                <p className="text-[20px] font-medium">{item.mieuta}</p>
                <p className="text-[16px] text-[#C0C0C0] mt-[28px]">
                  {item.gia}₫
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Together Forever */}
      <div className="flex flex-col gap-[50px] mb-[200px]">
        <a className="text-[40px] font-semibold">Together Forever</a>
        <div className="h-[600px] flex flex-row justify-around gap-[20px]">
            <img src={nhan5.src} alt=""/>
            <div className="w-[600px] flex flex-col justify-between text-black">
                <a className=" text-[48px] font-bold">A</a>
                <a className=" text-[110px] font-extrabold text-[#A18B10]">LOVE</a>
                <a className=" text-[32px] font-bold">STORY WITHOUT LIMITS</a>
                <a className=" text-[32px] font-light my-[10px]">Couple rings are more than jewelry — they symbolize “two hearts, one rhythm.” Each design is crafted with care to reflect your love and celebrate every precious moment together.</a>
                <button className="w-[200px] h-[50px] border-[5px] border-[#A18B10] rounded-[5px] flex flex-row items-center justify-center gap-[10px] cursor-pointer" onClick={()=>{router.push("/ring")}}>
                    <p className=" text-[24px] font-thin">Shop now</p>
                    <Arrow/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
