/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCartItem, fetchCart, updateCartItem } from "@/services/cartService";
import formatPrice from "@/lib/ultis/FormatPrice";
import { CartItem } from "@/lib/types/types";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState("free");

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setItems(data || []);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantity = async (
    productId: number,
    delta: number,
    variation: { color: string; size: string }
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product_id === productId &&
        item.variation?.color === variation.color &&
        item.variation?.size === variation.size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    try {
      const targetItem = items.find(
        (i) =>
          i.product_id === productId &&
          i.variation?.color === variation.color &&
          i.variation?.size === variation.size
      );
      if (!targetItem) return;

      const newQuantity = targetItem.quantity + delta;

      if (newQuantity < 1) {
        // Nếu giảm xuống dưới 1, xoá luôn
        await deleteCartItem(productId, variation);
      } else {
        // Còn lại thì update bình thường
        await updateCartItem(productId, variation, newQuantity);
      }

      // Refresh lại cart
      const updated = await fetchCart();
      setItems(updated || []);
    } catch (error) {
      console.error("Cập nhật số lượng thất bại:", error);
    }
  };

  const handleCheckout = () => {
    const summary = {
      shippingMethod: shipping,
      shippingCost,
      subtotal,
      total,
      items, // lưu toàn bộ giỏ hàng
    };

    localStorage.setItem("checkout_summary", JSON.stringify(summary));
    router.push("/checkout");
  };


  const handleRemove = async (item: CartItem) => {
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

  const subtotal = items.reduce(
    (sum, item) => sum + (item.snapshot?.price as number) * item.quantity,
    0
  );

  const shippingCost =
    shipping === "fast"
      ? 200000
      : shipping === "store"
      ? -Math.round(subtotal * 0.005)
      : 0;

  const total = subtotal + shippingCost;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng</h2>

      <div className="flex items-center gap-8 justify-center mb-10">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            <span
              className={`text-sm ${
                step === 1 ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              {step === 1
                ? "Giỏ hàng"
                : step === 2
                ? "Chi tiết thanh toán"
                : "Đặt hàng thành công"}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 w-full max-w-6xl">
        {/* Danh sách sản phẩm */}
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-12 font-semibold text-sm text-gray-500 border-b py-2">
            <div className="col-span-5">Sản phẩm</div>
            <div className="col-span-2">Số lượng</div>
            <div className="col-span-2">Giá</div>
            <div className="col-span-3">Thành tiền</div>
          </div>

          {items.map((item) => (
            <div
              key={`${item.product_id}-${item.variation?.color}-${item.variation?.size}`}
              className="grid grid-cols-12 items-center py-4 border-b"
            >
              <div className="col-span-5 flex items-center gap-4">
                <Image
                  src={item.snapshot?.image || "/placeholder.jpg"}
                  alt={item.snapshot?.name || "Sản phẩm"}
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <div>
                  <p className="font-semibold text-sm truncate max-w-[180px]">
                    {item.snapshot?.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.snapshot?.slug}</p>
                  <p className="text-xs text-gray-500">
                    {item.variation?.color && `Màu: ${item.variation.color}`}{" "}
                    {item.variation?.size && `• Size: ${item.variation.size}`}
                  </p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-sm text-gray-400 underline"
                  >
                    Loại khỏi giỏ hàng
                  </button>
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <button
                  className="w-6 h-6 rounded border text-center"
                  onClick={() =>
                    handleQuantity(item.product_id, -1, {
                      color: item.variation?.color || "",
                      size: item.variation?.size || "",
                    })
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="w-6 h-6 rounded border text-center"
                  onClick={() =>
                    handleQuantity(item.product_id, 1, {
                      color: item.variation?.color || "",
                      size: item.variation?.size || "",
                    })
                  }
                >
                  +
                </button>
              </div>

              <div className="col-span-2">{formatPrice(item.snapshot?.price as number)}</div>

              <div className="col-span-3 font-semibold">
                {formatPrice((item.snapshot?.price as number) * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Thông tin đơn hàng */}
        <div className="col-span-12 md:col-span-4 border rounded-lg p-6 space-y-4 text-sm bg-white">
          <p className="font-semibold">Thông tin</p>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="free"
                checked={shipping === "free"}
                onChange={() => setShipping("free")}
              />
              Miễn phí giao hàng
              <span className="ml-auto">0</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="fast"
                checked={shipping === "fast"}
                onChange={() => setShipping("fast")}
              />
              Chuyển phát nhanh
              <span className="ml-auto">200.000</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="store"
                checked={shipping === "store"}
                onChange={() => setShipping("store")}
              />
              Lấy tại cửa hàng
              <span className="ml-auto">-0.5%</span>
            </label>
          </div>

          <div className="border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span>Tổng phụ</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Tổng</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            onClick={handleCheckout}
          >
            Thanh toán
          </button>
          
        </div>
      </div>
    </div>
  );
}
