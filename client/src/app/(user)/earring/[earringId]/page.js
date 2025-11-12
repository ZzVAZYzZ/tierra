"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toIntegerVND } from "../../utils/price";
import { useFetchProducts } from "../../../../hook/useFetchProducts";
import StarIcon from "../../../../assets/icons/star_icon";
import { useReview } from "../../../../hook/useReview";
import ReviewList from "../../components/ReviewList";

const formatPriceVND = (input) =>
  new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(
    toIntegerVND(input)
  );

export default function Page() {
  const { products, status, error } = useFetchProducts();
  const params = useParams();
  const router = useRouter();
  const ringId = params?.earringId;

  const product = React.useMemo(() => {
    return Array.isArray(products)
      ? products.find((p) => String(p?.product_id) === String(ringId))
      : undefined;
  }, [products, ringId]);

  const images = Array.isArray(product?.ProductImages)
    ? product.ProductImages
    : [];
  const mainImage = images.find((im) => im?.is_main) || images[0];
  const orderedImages = React.useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) return [];
    const main = images.find((im) => im?.is_main) || images[0];
    if (!main) return images;
    return [main, ...images.filter((im) => im?.image_id !== main?.image_id)];
  }, [images]);

  const [selectedImage, setSelectedImage] = React.useState(mainImage);
  React.useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage?.image_id]);

  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [canReview, setCanReview] = React.useState(false);
  const [reviewText, setReviewText] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);

  const { checkCanReview, postReview } = useReview();
  const [prop, setProp] = React.useState(null);

  React.useEffect(() => {
    if (!product?.product_id) return;
    const checkPermission = async () => {
      try {
        const res = await checkCanReview(product.product_id);
        setCanReview(!!res?.success);
      } catch (e) {
        console.warn("Khong the kiem tra quyen danh gia:", e.message);
        setCanReview(false);
      }
    };
    checkPermission();
  }, [product?.product_id]);

  const handleOpenReview = () => {
    if (!canReview)
      return alert("Ban can mua san pham nay truoc khi viet danh gia.");
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    try {
      await postReview({
        product_id: product.product_id,
        rating,
        comment: reviewText,
      });
      alert("Cam on ban da danh gia san pham!");
      setShowReviewModal(false);
      // setReviewText("");
      // setRating(0);
      setProp({comment: reviewText, rating})
    } catch (err) {
      alert(err.message);
    }
  };

  const addToCart = (showAlert = true) => {
    if (!product) return;
    const item = {
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      discount_price: product.discount_price,
      quantity: 1,
      selected: true,
      image_url: selectedImage?.image_url || images[0]?.image_url || "",
    };

    try {
      const raw = localStorage.getItem("cart_items");
      const list = raw ? JSON.parse(raw) : [];
      let found = false;
      const updated = Array.isArray(list)
        ? list.map((it) => {
            if (String(it.product_id) === String(item.product_id)) {
              found = true;
              return {
                ...it,
                quantity: (Number(it.quantity) || 1) + 1,
                selected: true,
              };
            }
            return it;
          })
        : [];

      const next = found ? updated : [...updated, item];
      localStorage.setItem("cart_items", JSON.stringify(next));

      if (showAlert) {
        alert("Đã thêm vào giỏ hàng");
      }
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ:", err);
    }
  };

  const buyNow = () => {
    addToCart(false);
    router.push("/cart");
  };

  return (
    <div className="w-full flex justify-center mt-6 mb-12 relative">
      <div className="w-[90%] max-w-[1200px]">
        {status === "failed" && (
          <div className="p-4 text-sm text-red-500">
            Lỗi tải dữ liệu: {String(error)}
          </div>
        )}

        {(status === "loading" || status === "idle") && (
          <div className="p-4 text-sm text-gray-500">Đang tải sản phẩm...</div>
        )}

        {(status === "successed" || status === "successed") && product && (
          <>
            {/* --- PHẦN 1: ẢNH + THÔNG TIN SẢN PHẨM --- */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Cột trái - hình ảnh */}
              <div className="w-full md:w-1/2">
                {selectedImage?.image_url && (
                  <img
                    src={selectedImage.image_url}
                    alt={product.name}
                    className="w-full h-[420px] object-cover rounded-md border"
                  />
                )}
                {orderedImages.length > 1 && (
                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {orderedImages.map((img) => (
                      <img
                        key={img.image_id}
                        src={img.image_url}
                        alt={product.name}
                        onClick={() => setSelectedImage(img)}
                        className={`h-[80px] w-full object-cover rounded border cursor-pointer ${
                          img.image_id === selectedImage?.image_id
                            ? "ring-2 ring-[#9B8D6F]"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Cột phải - thông tin sản phẩm */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-[#3A3A3A]">
                  {product.name}
                </h1>

                {/* Giá */}
                {(() => {
                  const priceInt = toIntegerVND(product.price);
                  const discountInt = toIntegerVND(product.discount_price);
                  const hasDiscount =
                    Number.isFinite(priceInt) &&
                    Number.isFinite(discountInt) &&
                    discountInt > 0 &&
                    discountInt < priceInt;
                  const finalPrice = hasDiscount
                    ? Math.max(priceInt - discountInt, 0)
                    : priceInt;
                  return hasDiscount ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-[#9B8D6F]">
                        {formatPriceVND(finalPrice)} ₫
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        {formatPriceVND(priceInt)} ₫
                      </span>
                    </div>
                  ) : (
                    <div className="text-xl text-[#9B8D6F]">
                      {formatPriceVND(priceInt)} ₫
                    </div>
                  );
                })()}

                {/* Chất liệu */}
                <div className="w-[80px] text-sm font-bold">
                  Chất liệu
                  <div className="h-[30px] flex justify-center items-center border rounded-[8px] mt-[20px] font-normal">
                    {product.material === "vang" ? <>Vàng</> : <>Kim cương</>}
                  </div>
                </div>

                {/* Màu */}
                <div className="text-sm font-bold">
                  Màu
                  <div className="mt-[10px] flex items-center gap-3">
                    {(() => {
                      const current = String(product.color || "").toLowerCase();
                      const colors = [
                        { key: "trang", hex: "#D6D6D6" },
                        { key: "vang", hex: "#F1DC87" },
                        { key: "hong", hex: "#F2BAA8" },
                      ];
                      const shown = colors.filter(
                        (c) =>
                          current === c.key ||
                          (c.key === "hong" && current.includes("hong"))
                      );
                      return shown.map((color) => (
                        <div
                          key={color.key}
                          className="w-[40px] h-[40px] rounded-[8px] border border-gray-300"
                          style={{ backgroundColor: color.hex }}
                        />
                      ));
                    })()}
                  </div>
                </div>

                {/* Tồn kho */}
                <div className="text-sm font-bold">
                  Tồn kho:{" "}
                  {Number.isFinite(product.stock_quantity)
                    ? product.stock_quantity
                    : "?"}
                </div>

                {/* Nút hành động */}
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={addToCart}
                    className="w-[260px] h-[60px] text-[24px] rounded bg-white border border-black cursor-pointer"
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    onClick={buyNow}
                    className="w-[260px] h-[60px] text-[24px] rounded border border-[#9B8D6F] text-white bg-[#9B8D6F]"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>

            {/* --- PHẦN 2: GIỚI THIỆU & ĐÁNH GIÁ --- */}
            <div className="flex flex-col gap-[20px] mt-[60px]">
              {/* Giới thiệu */}
              <div>
                <div className="text-[32px] font-medium mb-[10px]">
                  Giới thiệu về sản phẩm
                </div>
                <div className="text-[24px] font-extralight">
                  {product.description}
                </div>
              </div>

              {/* Đánh giá */}
              <div className="mt-[40px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[28px] font-semibold text-[#3A3A3A]">
                    Đánh giá từ khách hàng
                  </h2>
                  {canReview && (
                    <button
                      onClick={handleOpenReview}
                      className="w-[200px] h-[60px] rounded-[8px] bg-[#3771C8] text-white text-[20px] font-medium hover:opacity-90 transition"
                    >
                      Viết đánh giá
                    </button>
                  )}
                </div>
                <ReviewList productId={product.product_id} prop={prop} />
              </div>
            </div>
          </>
        )}

        {(status === "succeeded" || status === "successed") && !product && (
          <div className="p-4 text-sm text-gray-500">
            Không tìm thấy sản phẩm
          </div>
        )}
      </div>
      {/* ----- MODAL VIẾT ĐÁNH GIÁ ----- */}
      {showReviewModal && (
        <div className=" absolute w-full h-full flex justify-center items-center">
          <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50"></div>
          <div className="bg-white w-[560px] max-w-[92vw] absolute rounded-[12px] p-6 shadow-lg z-100">
            <button
              onClick={() => setShowReviewModal(false)}
              aria-label="Close"
              className="w-[45px] h-[45px] rounded-full bg-[#E9E9E9] absolute top-3 right-3 text-gray-400 hover:text-black text-2xl leading-[45px] "
            >
              x
            </button>

            <div className="flex justify-center mb-4">
              {selectedImage?.image_url && (
                <img
                  src={selectedImage.image_url}
                  alt={product.name}
                  className="w-[50px] h-[50px] object-cover border border-[#C0C0C0] shadow-sm"
                />
              )}
            </div>

            <h2 className="text-[16px] font-semibold text-center mb-4">
              {product.name}
            </h2>

            <div
              className="flex justify-center mb-4"
              onMouseLeave={() => setHoverRating(0)}
            >
              {Array.from({ length: 5 }).map((_, i) => {
                const index = i + 1;
                const isActive = index <= (hoverRating || rating);
                return (
                  <span
                    key={index}
                    onMouseEnter={() => setHoverRating(index)}
                    onClick={() => setRating(index)}
                    className={`cursor-pointer transition-transform duration-200 ${
                      isActive ? "scale-110" : "hover:scale-105"
                    }`}
                  >
                    <StarIcon
                      size={30}
                      gradient={isActive}
                      color={isActive ? "#FACC15" : "#D1D5DB"}
                    />
                  </span>
                );
              })}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[24px] font-medium text-[#3A3A3A]">
                  Chia sẻ về sản phẩm
                </label>
                <textarea
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="border rounded-[6px] p-2 text-[16px] min-h-[100px] w-full"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="mt-2 w-full h-[48px] bg-[#3771C8] text-white text-[18px] font-medium rounded-[8px] hover:opacity-90"
              >
                Viết đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
