"use client";
import React, { useEffect, useState } from "react";

export default function PaymentResultPage() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("paymentResult");
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  if (!result) return <p>Đang tải...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {result.success ? (
        <>
          <h2 style={{ color: "green" }}>✅ Thanh toán thành công</h2>
          <p>Mã đơn hàng: {result.orderId}</p>
        </>
      ) : (
        <>
          <h2 style={{ color: "red" }}>❌ Thanh toán thất bại</h2>
          <p>{result.error || "Không rõ lỗi"}</p>
        </>
      )}
    </div>
  );
}
