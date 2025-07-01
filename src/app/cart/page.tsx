"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const cartItems = [
  {
    id: 1,
    name: "Nhẫn Kim cương Vàng Trắng 14K",
    code: "My First Diamond - MFDB52689",
    image: "/images/ring.png",
    price: 19945000,
    quantity: 2,
  },
  {
    id: 2,
    name: "Nhẫn Kim cương Vàng Trắng 14K",
    code: "My First Diamond - MFDB52689",
    image: "/images/ring.png",
    price: 19945000,
    quantity: 2,
  },
  {
    id: 3,
    name: "Nhẫn Kim cương Vàng Trắng 14K",
    code: "My First Diamond - MFDB52689",
    image: "/images/ring.png",
    price: 19945000,
    quantity: 2,
  },
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);
  const [shipping, setShipping] = useState("free");
  const [discountCode, setDiscountCode] = useState("");

  const handleQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
      {/* Bước tiến trình */}
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
              key={item.id}
              className="grid grid-cols-12 items-center py-4 border-b"
            >
              <div className="col-span-5 flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <div>
                  <p className="font-semibold text-sm truncate max-w-[180px]">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.code}</p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-gray-400 underline"
                  >
                    Loại khỏi giỏ hàng
                  </button>
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <button
                  className="w-6 h-6 rounded border text-center"
                  onClick={() => handleQuantity(item.id, -1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="w-6 h-6 rounded border text-center"
                  onClick={() => handleQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>

              <div className="col-span-2">
                {item.price.toLocaleString("vi-VN")}
              </div>

              <div className="col-span-3 font-semibold">
                {(item.price * item.quantity).toLocaleString("vi-VN")}
              </div>
            </div>
          ))}

          {/* Mã giảm giá */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Bạn có mã giảm giá</p>
            <p className="text-sm mb-2">
              Thêm mã của bạn để được giảm giá giỏ hàng ngay lập tức
            </p>
            <div className="flex gap-2">
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Code"
                className="border rounded px-4 py-2 w-48 text-sm"
              />
              <button className="bg-gray-200 hover:bg-gray-300 rounded px-4 text-sm">
                Thêm
              </button>
            </div>
          </div>
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
              <span>{subtotal.toLocaleString("vi-VN")}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Tổng</span>
              <span>{total.toLocaleString("vi-VN")}</span>
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
