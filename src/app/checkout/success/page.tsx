/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchOrderDetail } from "@/services/orderServices";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = localStorage.getItem("last_order_id");
      if (!orderId) return;

      try {
        const data = await fetchOrderDetail(Number(orderId));
        setOrder(data);
      } catch (err) {
        console.error("Lỗi lấy thông tin đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  if (loading) return <div className="text-center p-10">Đang tải đơn hàng...</div>;

  if (!order) return <div className="text-center p-10 text-red-500">Không tìm thấy đơn hàng</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">Đặt hàng thành công</h1>

      <div className="flex items-center justify-center gap-10 mb-10">
        <Step label="Giỏ hàng" active />
        <Step label="Chi tiết thanh toán" active />
        <Step label="Đặt hàng thành công" active current />
      </div>

      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Thank you! 🎉</h2>
        <p className="text-lg font-medium mb-6">Đơn đặt hàng của bạn đã được nhận</p>

        <div className="flex justify-center gap-4 mb-6">
          {Array.isArray(order.line_items) && order.line_items.map((item: any) => (
            <div key={item.id} className="relative w-20 h-20">
              <Image
                src={item.image?.src || "/placeholder.jpg"}
                alt={item.name}
                fill
                className="object-contain rounded"
              />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="text-left text-sm space-y-2 mb-6">
          <p><strong>Mã đơn:</strong> #{order.id}</p>
          <p><strong>Ngày đặt:</strong> {new Date(order.created_at).toLocaleString("vi-VN")}</p>
          <p><strong>Tổng:</strong> {Number(order.total).toLocaleString("vi-VN")}₫</p>
          <p><strong>Thanh toán:</strong> {order.payment_method_title || order.payment_method}</p>
        </div>

        <button
          onClick={() => router.push("/orders")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Lịch sử mua hàng
        </button>
      </div>
    </div>
  );
}

function Step({ label, active = false, current = false }: { label: string; active?: boolean; current?: boolean }) {
  return (
    <div className="flex flex-col items-center text-sm font-medium">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-white mb-1 ${
          active ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        ✓
      </div>
      <span className={`${current ? "text-black" : "text-green-600"}`}>{label}</span>
      <div className="w-full h-0.5 mt-1" style={{ backgroundColor: current ? "#000" : "#16a34a" }} />
    </div>
  );
}
