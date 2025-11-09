"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toIntegerVND } from "../../utils/price";
import { useFetchProducts } from "../../../../hook/useFetchProducts";
import StarIcon from "../../../../assets/icons/star_icon";
import { useReview } from "../../../../hook/useReview";
import ReviewList from "../../components/ReviewList";

// Hàm định dạng tiền Việt Nam
const formatPriceVND = (input) =>
  new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(
    toIntegerVND(input)
  );

export default function Page() {
  const { products, status, error } = useFetchProducts();
  const params = useParams();
  const router = useRouter();
  const ringId = params?.ringId;

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [canReview, setCanReview] = React.useState(false);

  const [reviewText, setReviewText] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [reviewName, setReviewName] = React.useState("");

  const { checkCanReview, postReview } = useReview();

  const product = React.useMemo(() => {
    return Array.isArray(products)
      ? products.find((p) => String(p?.product_id) === String(ringId))
      : undefined;
  }, [products, ringId]);

  const images = Array.isArray(product?.ProductImages)
    ? product.ProductImages
    : [];
  const mainImage = images.find((im) => im?.is_main) || images[0];

  React.useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage?.image_id]);

  // Kiểm tra quyền viết đánh giá
  React.useEffect(() => {
    if (!product?.product_id) return;

    const checkPermission = async () => {
      try {
        const res = await checkCanReview(product.product_id);
        // console.log("🔍 Kết quả checkCanReview:", res);
        setCanReview(!!res?.success);
      } catch (e) {
        console.warn("❌ Không thể kiểm tra quyền đánh giá:", e.message);
        setCanReview(false);
      }
    };

    checkPermission();
  }, [product?.product_id]);

  // Thêm vào giỏ hàng
  const addToCart = () => {
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

    const raw = localStorage.getItem("cart_items");
    const list = raw ? JSON.parse(raw) : [];
    const exists = list.find(
      (i) => String(i.product_id) === String(item.product_id)
    );
    if (exists) {
      exists.quantity += 1;
    } else {
      list.push(item);
    }
    localStorage.setItem("cart_items", JSON.stringify(list));
    alert("Đã thêm vào giỏ hàng!");
  };

  const buyNow = () => {
    addToCart();
    router.push("/cart");
  };

  // Xử lý mở modal viết đánh giá
  const handleOpenReview = () => {
    if (!canReview)
      return alert("Bạn cần mua sản phẩm này trước khi viết đánh giá.");
    setShowReviewModal(true);
  };

  // Gửi đánh giá
  const handleSubmitReview = async () => {
    try {
      await postReview({
        product_id: product.product_id,
        rating,
        comment: reviewText,
        user_name: reviewName,
      });
      alert("Cảm ơn bạn đã đánh giá sản phẩm!");
      setShowReviewModal(false);
      setReviewText("");
      setRating(0);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full flex justify-center mt-6 mb-12">
      <div className="w-[90%] max-w-[1200px]">
        {/* ----- HIỂN THỊ TRẠNG THÁI ----- */}
        {status === "failed" && (
          <div className="p-4 text-sm text-red-500">
            Lỗi tải dữ liệu: {String(error)}
          </div>
        )}

        {(status === "loading" || status === "idle") && (
          <div className="p-4 text-sm text-gray-500">Đang tải sản phẩm...</div>
        )}

        {(status === "successed" || status === "succeeded") && product && (
          <>
            {/* ----- ẢNH & THÔNG TIN SẢN PHẨM ----- */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                {selectedImage?.image_url && (
                  <img
                    src={selectedImage.image_url}
                    alt={product.name}
                    className="w-full h-[420px] object-cover rounded-md border"
                  />
                )}
                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {images.map((img) => (
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

              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-[#3A3A3A]">
                  {product.name}
                </h1>

                {/* Giá */}
                {(() => {
                  const priceInt = toIntegerVND(product.price);
                  const discountInt = toIntegerVND(product.discount_price);
                  const hasDiscount = discountInt > 0 && discountInt < priceInt;
                  const finalPrice = hasDiscount
                    ? priceInt - discountInt
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
                <div className="text-sm font-bold">
                  Chất liệu:
                  <div className="mt-2 h-[30px] flex justify-center items-center border rounded-[8px] w-[80px] font-normal">
                    {product.material === "vang" ? "Vàng" : "Kim cương"}
                  </div>
                </div>

                {/* Tồn kho */}
                <div className="text-sm font-bold">
                  Tồn kho: {product.stock_quantity ?? "?"}
                </div>

                {/* Nút hành động */}
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={addToCart}
                    className="w-[260px] h-[60px] text-[20px] rounded bg-white border border-black cursor-pointer"
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    onClick={buyNow}
                    className="w-[260px] h-[60px] text-[20px] rounded border border-[#9B8D6F] text-white bg-[#9B8D6F]"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>

            {/* ----- GIỚI THIỆU & ĐÁNH GIÁ ----- */}
            <div className="mt-[60px]">
              <div className="text-[32px] font-medium mb-[10px]">
                Giới thiệu về sản phẩm
              </div>
              <div className="text-[20px] font-light text-[#444] leading-relaxed">
                {product.description}
              </div>

              {/* ----- ĐÁNH GIÁ ----- */}
              <div className="mt-[40px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[28px] font-semibold text-[#3A3A3A]">
                    Đánh giá từ khách hàng
                  </h2>
                  {canReview && (
                    <button
                      onClick={handleOpenReview}
                      className="px-6 py-3 rounded-[8px] bg-[#3771C8] text-white text-[18px] font-medium hover:opacity-90 transition"
                    >
                      Viết đánh giá
                    </button>
                  )}
                </div>

                {/* Danh sách đánh giá */}
                <ReviewList productId={product.product_id} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ----- MODAL VIẾT ĐÁNH GIÁ ----- */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[560px] max-w-[92vw] rounded-[12px] p-6 shadow-lg relative">
            {/* Nút đóng */}
            <button
              onClick={() => setShowReviewModal(false)}
              aria-label="Close"
              className="w-[45px] h-[45px] rounded-full bg-[#E9E9E9] absolute top-3 right-3 text-gray-400 hover:text-black text-2xl leading-[45px] "
            >
              ×
            </button>

            {/* Ảnh sản phẩm */}
            <div className="flex justify-center mb-4">
              {selectedImage?.image_url && (
                <img
                  src={selectedImage.image_url}
                  alt={product.name}
                  className="w-[50px] h-[50px] object-cover border border-[#C0C0C0] shadow-sm"
                />
              )}
            </div>

            {/* Tên sản phẩm */}
            <h2 className="text-[16px] font-semibold text-center mb-4">
              {product.name}
            </h2>

            {/* Đánh giá sao */}
            <div
              className="flex justify-center mb-4"
              onMouseLeave={() => setHoverRating(0)} // Khi rời chuột ra ngoài thì reset sao hover
            >
              {Array.from({ length: 5 }).map((_, i) => {
                const index = i + 1;
                const isActive = index <= (hoverRating || rating); // nếu đang hover thì ưu tiên hover, nếu không thì lấy rating
                return (
                  <span
                    key={index}
                    onMouseEnter={() => setHoverRating(index)} // Hover tạm thời
                    onClick={() => setRating(index)} // Click để cố định rating
                    className={`cursor-pointer transition-transform duration-200 ${
                      isActive ? "scale-110" : "hover:scale-105"
                    }`}
                  >
                    <StarIcon
                      size={30}
                      gradient={isActive}
                      color={isActive ? "#FACC15" : "#D1D5DB"} // sao vàng hoặc xám
                    />
                  </span>
                );
              })}
            </div>

            {/* Form nội dung đánh giá */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[24px] font-medium text-[#3A3A3A]">
                  Họ và tên
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border rounded-[6px] h-[44px] px-3 text-[16px]"
                />
              </div>

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
