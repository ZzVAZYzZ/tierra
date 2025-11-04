"use client";
import { useSearchParams } from "next/navigation";

export default function PaymentResultPage() {
  const params = useSearchParams();
  const status = params.get("status");
  const orderId = params.get("orderId");
  const error = params.get("error");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {status === "success" ? (
        <>
          <h1>✅ Thanh toán thành công!</h1>
          <p>Mã đơn hàng: {orderId}</p>
        </>
      ) : (
        <>
          <h1>❌ Thanh toán thất bại</h1>
          <p>{error || "Đã có lỗi xảy ra."}</p>
        </>
      )}
    </div>
  );
}
