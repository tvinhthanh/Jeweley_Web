"use client";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";

export default function CheckoutFailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-3xl font-bold text-red-600 mb-4">Đặt hàng thất bại ❌</div>
      <p className="text-gray-600 mb-6">
        Rất tiếc! Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại.
      </p>
      <button
        onClick={() => router.push("/checkout")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Quay lại thanh toán
      </button>
    </div>
  );
}
