"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogOut, Menu } from "lucide-react";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <div
        className="w-[35px] h-[35px] rounded-full border border-[#9B8D6F] overflow-hidden cursor-pointer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Image
          width={35}
          height={35}
          src={
            user?.avatar ||
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }
          alt="User Avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-[180px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 
                     animate-fade-in"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* Item 1 */}
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-[#9B8D6F] hover:bg-[#f3f0eb] transition-all"
          >
            <Menu size={16} />
            <span>Thông tin người dùng</span>
          </Link>

          <hr className="border-[#e2dfda]" />

          {/* Item 2 */}
          <button
            onClick={() => alert("Đăng xuất")}
            className="w-full text-left flex items-center gap-2 px-4 py-2 text-[#9B8D6F] hover:bg-[#f3f0eb] transition-all"
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
}
