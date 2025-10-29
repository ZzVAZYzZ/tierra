"use client";
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
import { useFetchProducts } from "../hook/useFetchProducts";
import { toIntegerVND } from "../app/(user)/utils/price";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logouticon from "../assets/images/logouticon.png";
import profileicon from "../assets/images/infoIcon.png";
import { useAuth } from "../hook/useAuth";

const Nav = () => {
  const { products } = useFetchProducts();

  const [query, setQuery] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const overlayInputRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const router = useRouter();

  const { user } = useSelector((state) => state.user);
  useAuth();
  // 🕓 debounce tìm kiếm
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 1000);
    return () => clearTimeout(t);
  }, [query]);

  // 🔍 focus input khi mở overlay
  React.useEffect(() => {
    if (open) setTimeout(() => overlayInputRef.current?.focus(), 0);
  }, [open]);

  // ❌ đóng search panel khi click ra ngoài
  React.useEffect(() => {
    const handleDown = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, [open]);

  // ❌ đóng user menu khi click ra ngoài
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // kết quả tìm kiếm
  const results = React.useMemo(() => {
    const q = debounced.toLowerCase();
    if (!q) return [];
    const list = Array.isArray(products) ? products : [];
    return list
      .filter((p) => String(p?.name || "").toLowerCase().includes(q))
      .slice(0, 8);
  }, [products, debounced]);

  const formatPrice = (p) => {
    const v = toIntegerVND(p);
    try {
      return new Intl.NumberFormat("vi-VN").format(v) + " vn₫";
    } catch {
      return `${v} vn₫`;
    }
  };

  const getMainImage = (item) => {
    const imgs = Array.isArray(item?.ProductImages) ? item.ProductImages : [];
    const main = imgs.find((im) => im?.is_main) || imgs[0];
    return main?.image_url || "";
  };

  const handleLogout = () => {
    console.log("Đăng xuất");
    // TODO: gọi API logout, clear token ở đây
    setIsUserMenuOpen(false);
    router.push("/login");
  };

  return (
    <div className="flex flex-col">
      {/* make color */}
      <div className="h-[30px] bg-[#9B8D6F]"></div>

      {/* about */}
      <div className="h-[100px] flex flex-row items-center justify-between mx-[65px]">
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

            {/* 👇 User menu click version */}
            {user ? (
              <div className="relative" ref={menuRef}>
                {/* Avatar */}
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="w-[30px] h-[30px] rounded-full border border-[#9B8D6F] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={
                      user?.avatar ||
                      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="object-cover rounded-full"
                    priority
                  />

                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-[180px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-[#9B8D6F] text-[12px] font-[bold] hover:bg-[#f3f0eb] transition-all"
                    >
                      <Image
                        src={profileicon}
                        alt="Profile Icon"
                        width={16}
                        height={16}

                      />
                      <span>Thông tin người dùng</span>
                    </Link>

                    <hr className="border-[#e2dfda]" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex  text-[12px] font-[bold] items-center gap-2 px-4 py-2 text-[#9B8D6F] hover:bg-[#f3f0eb] transition-all cursor-pointer"
                    >
                      <Image
                        src={logouticon}
                        alt="Logout Icon"
                        width={16}
                        height={16}
                      />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href={"/login"}>
                <UserIcon />
              </Link>
            )}
          </div>

          <div className="h-[20px] flex flex-row justify-center gap-[24px]">
            <div>
              <a href="#">Về chúng tôi</a>
            </div>
            <div className="flex flex-row items-center gap-[7px] leading-[20px]">
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
        <div>
          <a>Ưu đãi</a>
        </div>

        {/* Small trigger search */}
        <div className="w-[350px] h-[50px] border rounded-full flex items-center px-5 bg-white">
          <input
            ref={inputRef}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm"
            className="flex-1 outline-none placeholder-[#C0C0C0] bg-transparent"
          />
          <button onClick={() => setOpen(true)} aria-label="Open search">
            <SearchIcon />
          </button>
        </div>
      </div>

      <hr className="h-[2px] bg-[#9B8D6F] border-[white]"></hr>

      {/* overlay search */}
      {open && (
        <div className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            className="relative z-[201] h-full w-full flex flex-col items-center pt-16 overflow-hidden pointer-events-none"
          >
            <div className="w-[900px] pointer-events-auto">
              <div className="w-full h-[80px] border rounded-full flex items-center px-8 bg-white">
                <input
                  ref={overlayInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm"
                  className="flex-1 outline-none placeholder-[#C0C0C0] bg-transparent text-lg"
                />
                <SearchIcon />
              </div>
            </div>

            <div className="mt-6 w-[900px] max-h-[70vh] overflow-auto bg-white rounded-xl border pointer-events-auto">
              <div className="divide-y">
                {debounced && results.length === 0 && (
                  <div className="p-4 text-sm text-gray-500">
                    Không tìm thấy sản phẩm
                  </div>
                )}
                {results.map((item) => (
                  <div
                    key={item.product_id}
                    className="w-[850px] h-[100px] mx-auto flex items-center gap-[20px] py-2"
                  >
                    {getMainImage(item) && (
                      <img
                        src={getMainImage(item)}
                        alt={item.name}
                        className="w-[80px] h-[80px] object-cover rounded"
                      />
                    )}
                    <div className="flex-1 h-full flex flex-col justify-center">
                      <div className="text-[16px] text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-[14px] text-[#9B8D6F] mt-1">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="self-end text-xs text-gray-500">
                      0 lượt bán
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
