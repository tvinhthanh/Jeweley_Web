"use client";

import { useEffect, useState } from "react";
import { fetchMyOrders } from "@/services/orderServices";
import { Order } from "@/lib/types/types";

export function OrderTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Không thể lấy đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <div className="p-4">Đang tải đơn hàng...</div>;

  if (selectedOrder) {
    return (
      <div className="p-4 text-gray-800">
        <button
          className="mb-4 text-blue-600 hover:underline"
          onClick={() => setSelectedOrder(null)}
        >
          ← Quay lại danh sách đơn hàng
        </button>

        <h1 className="text-2xl font-semibold mb-4">
          Đơn hàng #{selectedOrder.id}
        </h1>
        <p>
          Ngày tạo:{" "}
          {new Date(selectedOrder.created_at).toLocaleString("vi-VN")}
        </p>
        <p>
          Trạng thái:{" "}
          <span className="capitalize">{selectedOrder.status}</span>
        </p>
        <p>
          Tổng tiền:{" "}
          <strong>
            {Number(selectedOrder.total).toLocaleString("vi-VN")}₫
          </strong>
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Sản phẩm:</h2>
          {selectedOrder.items.length > 0 ? (
            <ul className="list-disc pl-5">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx}>
                  {item.quantity} x {item.name} –{" "}
                  {Number(item.total).toLocaleString("vi-VN")}₫
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có sản phẩm nào trong đơn hàng.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto text-gray-800">
      <h2 className="text-xl font-semibold mb-6">Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="min-w-full border-t border-b border-gray-200 text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-4">Mã đơn</th>
              <th className="py-3 px-4">Ngày tạo</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4">Tổng tiền</th>
              <th className="py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-3 px-4 font-medium">#{order.id}</td>
                <td className="py-3 px-4">
                  {new Date(order.created_at).toLocaleString("vi-VN")}
                </td>
                <td className="py-3 px-4 capitalize">{order.status}</td>
                <td className="py-3 px-4">
                  {Number(order.total).toLocaleString("vi-VN")}₫
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
