"use client";
import React, { useEffect, useState } from "react";
import StarIcon from "../../../assets/icons/star_icon";
import { useReview } from "../../../hook/useReview";

export default function ReviewList({ productId }) {
  const { getReviewsByProduct } = useReview();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      try {
        const data = await getReviewsByProduct(productId);
        setReviews(data || []);
      } catch (err) {
        console.error("❌ Lỗi tải đánh giá:", err);
      }
    })();
  }, [productId]);

  return (
    <div className="mt-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500 italic text-[16px]">
          Chưa có đánh giá nào
        </p>
      ) : (
        <>
          <p className="text-[16px] text-gray-600 mb-4">
            Hiện có <strong>{reviews.length}</strong> đánh giá
          </p>

          <div className="flex flex-col gap-6">
            {reviews.map((r) => (
              <div
                key={r.review_id}
                className="border-b pb-4 flex items-center gap-4"
              >
                {/* 🧑 Avatar */}
                <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-[20px] font-semibold text-gray-600 flex-shrink-0">
                  {r.user_name?.charAt(0)?.toUpperCase() || "?"}
                </div>

                {/* 📋 Nội dung chia 3 cột */}
                <div className="flex w-full items-start justify-between">
                  {/* 👤 Tên người dùng */}
                  <div className="w-[200px] shrink-0">
                    <h3 className="font-semibold text-[24px] text-[#333] truncate">
                      {r.user_name}
                    </h3>
                  </div>

                  {/* 💬 Bình luận */}
                  <div className="flex-1 px-4">
                    <p className="text-gray-700 text-[20px] leading-relaxed wrap-break-word">
                      {r.comment}
                    </p>
                  </div>

                  {/* ⭐ Số sao */}
                  <div className="w-[130px] flex justify-end">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        size={30}
                        color={i < r.rating ? "#FACC15" : "#D1D5DB"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
