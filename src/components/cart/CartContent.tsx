/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCart, clearCart, deleteCartItem } from "@/services/cartService";
import { CartItem } from "@/lib/types/types";
import formatPrice from "@/lib/ultis/FormatPrice";
import { FaTrash } from "react-icons/fa";

export default function CartContent() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setItems(data || []);
    } catch (err) {
      console.error("Lỗi khi load giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemoveItem = async (item: CartItem) => {
    try {
      await deleteCartItem(item.product_id, {
        color: item.variation?.color || "",
        size: item.variation?.size || "",
      });
      loadCart();
    } catch (err) {
      console.error("Xoá sản phẩm thất bại:", err);
    }
  };

  const handleClearCart = async () => {
    if (confirm("Bạn có chắc muốn xoá toàn bộ giỏ hàng?")) {
      try {
        await clearCart();
        loadCart();
      } catch (err) {
        console.error("Xoá toàn bộ giỏ hàng thất bại:", err);
      }
    }
  };

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.snapshot?.price as any) * (item.quantity || 0),
    0
  );

  if (loading) return <p>Đang tải giỏ hàng...</p>;
  if (items.length === 0)
    return <p className="text-gray-500 text-sm">Chưa có sản phẩm nào trong giỏ hàng.</p>;

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={`${item.product_id}-${item.variation?.color ?? ""}-${item.variation?.size ?? ""}-${index}`}
          className="flex items-start gap-4 mb-4 relative"
        >
          <Image
            src={item.snapshot?.image || "/placeholder.jpg"}
            alt={item.snapshot?.name || "Sản phẩm"}
            width={64}
            height={64}
            className="object-contain"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">{item.snapshot?.name}</p>
            <p className="text-xs text-gray-600">
              {item.variation?.color && <>Màu: {item.variation.color} • </>}
              {item.variation?.size && <>Size: {item.variation.size}</>}
            </p>
            <p className="text-sm mt-1">
              {item.quantity} × {formatPrice(item.snapshot?.price as number)}
            </p>
          </div>

          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleRemoveItem(item)}
            title="Xoá sản phẩm"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div className="mt-4 text-right font-semibold text-base border-t pt-3">
        Tổng cộng: {formatPrice(subtotal)}
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={handleClearCart}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          Xoá toàn bộ giỏ hàng
        </button>
      </div>
    </div>
  );
}
