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
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logouticon from "../assets/images/logouticon.png";
import profileicon from "../assets/images/infoIcon.png";
import { useAuth } from "../hook/useAuth";
import { resetUserState } from "../redux/features/userSlice";
import { useRedirect } from "../hook/useRedirect";
import { Box } from "lucide-react";

const Nav = () => {
  const { products } = useFetchProducts();

  const [query, setQuery] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isBillMenuOpen, setIsBillMenuOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const overlayInputRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const billMenuRef = React.useRef(null);
  const router = useRouter();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      // 👇 THÊM LOGIC ĐÓNG MENU HÓA ĐƠN
      if (billMenuRef.current && !billMenuRef.current.contains(e.target)) {
        setIsBillMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useRedirect();
  // kết quả tìm kiếm
  const results = React.useMemo(() => {
    const q = debounced.toLowerCase();
    if (!q) return [];
    const list = Array.isArray(products) ? products : [];
    return list
      .filter((p) =>
        String(p?.name || "")
          .toLowerCase()
          .includes(q)
      )
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

  // Navigate to product detail based on category name
  const goToProduct = (item) => {
    if (!item) return;
    const id = item?.product_id;
    const cat = String(item?.Category?.name || "")
      .trim()
      .toLowerCase();
    const map = {
      nhan: "ring",
      "bong tai": "earring",
      "day chuyen": "necklace",
      "vong tay": "bracelet",
    };
    const segment = map[cat] || "ring";
    if (id) {
      router.push(`/${segment}/${id}`);
      setOpen(false);
      setQuery("");
    }
  };

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

      setIsUserMenuOpen(false);
      dispatch(resetUserState());
      router.push("/home");
    } catch (error) {
      console.error("❌ Lỗi khi đăng xuất:", error);
      alert("Đăng xuất thất bại!");
    }
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
            <div className="flex items-center justify-center">
              <a href="#" className="flex items-center justify-center">
                <HeartIcon />
              </a>
            </div>

            <div className="relative">
              <a href="/cart">
                <CartIcon />
              </a>
            </div>

            {/* 👇 Bill/Order menu click version */}
            <div className="relative" ref={billMenuRef}>
              <button
                onClick={() => setIsBillMenuOpen((prev) => !prev)}
                aria-label="Order and History"
                className="flex items-center justify-center cursor-pointer"
              >
                <BillIcon />
              </button>

              {/* Dropdown cho Bill */}
              {isBillMenuOpen && (
                <div className="absolute right-0 mt-2 w-[220px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
                  {/* Tra cứu đơn hàng */}
                  <Link
                    href="/checkorder" // Thay bằng đường dẫn thực tế
                    onClick={() => setIsBillMenuOpen(false)}
                    className="flex justify-center items-center gap-2 px-4 py-2 text-[#9B8D6F] text-[12px] font-[bold] hover:bg-[#f3f0eb] transition-all"
                  >
                    {/* Có thể dùng icon SearchIcon hoặc một icon khác phù hợp */}
                    <SearchIcon className="w-4 h-4" />
                    <span>Tra cứu đơn hàng</span>
                  </Link>

                  <hr className="border-[#e2dfda]" />

                  {/* Xem lịch sử đặt hàng */}
                  <Link
                    href="/orderhistory" // Thay bằng đường dẫn thực tế
                    onClick={() => setIsBillMenuOpen(false)}
                    className=" gap-2 px-4 py-2 text-[#9B8D6F] text-[12px] font-[bold] hover:bg-[#f3f0eb] transition-all flex items-center justify-center"
                  >
                    {/* Có thể dùng icon BillIcon hoặc một icon khác phù hợp */}
                    <BillIcon className="w-4 h-4" />
                    <span>Xem lịch sử đặt hàng</span>
                  </Link>
                </div>
              )}
            </div>

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
                    {user.role === "admin" && (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-[#9B8D6F] text-[12px] font-bold hover:bg-[#f3f0eb] transition-all"
                        >
                          {/* Bạn có thể thay thế bằng một icon khác phù hợp với dashboard/admin */}
                          <Box size={16} />
                          <span>Quản lý cho Admin</span>
                        </Link>
                        <hr className="border-red-100" />
                      </>
                    )}

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

          <div className="h-5 flex flex-row justify-center gap-6">
            <div>
              <a href="#">Về chúng tôi</a>
            </div>
            <div className="flex flex-row items-center gap-[7px] leading-5">
              <button className="cursor-pointer">EN</button>
              <hr className="h-[80%] border"></hr>
              <button className="cursor-pointer">VI</button>
            </div>
          </div>
        </div>
      </div>

      {/* hr */}
      <hr className="h-0.5 bg-[#9B8D6F] border-[white]"></hr>

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

      <hr className="h-0.5 bg-[#9B8D6F] border-[white]"></hr>

      {/* overlay search */}
      {open && (
        <div className="fixed inset-0 z-200">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            className="relative z-201 h-full w-full flex flex-col items-center pt-16 overflow-hidden pointer-events-none"
          >
            <div className="w-[900px] pointer-events-auto">
              <div className="w-full h-20 border rounded-full flex items-center px-8 bg-white">
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
                    onClick={() => goToProduct(item)}
                    className="w-[850px] h-[100px] mx-auto flex items-center gap-5 py-2 cursor-pointer hover:bg-gray-50"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") goToProduct(item);
                    }}
                  >
                    {getMainImage(item) && (
                      <img
                        src={getMainImage(item)}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
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
