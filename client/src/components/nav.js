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
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProductsState } from "../store/features/couter/fechDataSlice.js";
import { toIntegerVND } from "../app/(user)/utils/price";

const Nav = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector(selectProductsState);

  React.useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const [query, setQuery] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const overlayInputRef = React.useRef(null);
  const panelRef = React.useRef(null);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 1000);
    return () => clearTimeout(t);
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => overlayInputRef.current?.focus(), 0);
    }
  }, [open]);

  // Close when clicking outside the search panel
  React.useEffect(() => {
    const handleDown = (e) => {
      if (!open) return;
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open]);

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
            <a href="/cart">
              <CartIcon />
            </a>
            <a href="/orderinfo">
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

      {/* Fullscreen overlay search */}
      {open && (
        <div className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div ref={panelRef} className="relative z-[201] h-full w-full flex flex-col items-center pt-16 overflow-hidden pointer-events-none">
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
                {status === "loading" && (
                  <div className="p-4 text-sm text-gray-500">
                    Đang tải dữ liệu…
                  </div>
                )}
                {debounced && results.length === 0 && status !== "loading" && (
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

