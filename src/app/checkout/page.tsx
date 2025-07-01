"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const router = useRouter();
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

  const handlePlaceOrder = () => {
    const isSuccess = Math.random() < 0.5; // 50% tỉ lệ thành công
    if (isSuccess) {
      router.push("/checkout/success");
    } else {
      router.push("/checkout/fail");
    }
  };
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10">Thanh toán</h1>

      {/* Steps */}
      <div className="flex justify-center mb-12 gap-16">
        {["Giỏ hàng", "Chi tiết thanh toán", "Đặt hàng thành công"].map(
          (label, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm ${
                  i === 0
                    ? "bg-green-500"
                    : i === 1
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs ${
                  i === 1 ? "font-semibold text-black" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left */}
        <div className="lg:col-span-8 space-y-6">
          {/* Contact Info */}
          <section className="border rounded p-6">
            <h2 className="font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="First name" className="border p-2 rounded" />
              <input placeholder="Last name" className="border p-2 rounded" />
              <input
                placeholder="Phone number"
                className="border p-2 rounded col-span-full"
              />
              <input
                placeholder="Your Email"
                className="border p-2 rounded col-span-full"
              />
            </div>
          </section>

          {/* Shipping Address */}
          <section className="border rounded p-6">
            <h2 className="font-semibold mb-4">Địa chỉ nhận hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Street Address"
                className="border p-2 rounded col-span-full"
              />
              <select className="border p-2 rounded">
                <option>Country</option>
              </select>
              <input placeholder="Town / City" className="border p-2 rounded" />
              <input placeholder="State" className="border p-2 rounded" />
              <input placeholder="Zip Code" className="border p-2 rounded" />
            </div>
            <div className="mt-4">
              <label className="text-sm">
                <input type="checkbox" className="mr-2" />
                Sử dụng địa chỉ thanh toán khác (tuỳ chọn)
              </label>
            </div>
          </section>

          {/* Payment Method */}
          <section className="border rounded p-6">
            <h2 className="font-semibold mb-4">Phương thức thanh toán</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                />
                Thanh toán bằng thẻ tín dụng
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Thanh toán khi nhận hàng
              </label>

              {paymentMethod === "credit" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <input
                    placeholder="1234 1234 1234"
                    className="border p-2 rounded col-span-full"
                  />
                  <input placeholder="MM/YY" className="border p-2 rounded" />
                  <input
                    placeholder="CVC code"
                    className="border p-2 rounded"
                  />
                </div>
              )}
            </div>
          </section>

          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white w-full py-2 rounded mt-6 hover:bg-blue-700"
          >
            Đặt hàng
          </button>
        </div>

        {/* Right */}
        <div className="lg:col-span-4 border rounded p-6 bg-white space-y-4">
          <p className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3 py-3 border-b">
              <Image
                src={item.image}
                width={64}
                height={64}
                alt={item.name}
                className="object-contain"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold truncate max-w-[160px]">
                    {item.name}
                  </p>
                  <span className="text-sm font-bold whitespace-nowrap">
                    {item.price.toLocaleString("vi-VN")}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{item.code}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button className="w-6 h-6 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button className="w-6 h-6 border rounded">+</button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <input
              placeholder="Nhập mã giảm giá"
              className="border rounded px-3 py-1 flex-1 text-sm"
            />
            <button className="bg-blue-600 text-white px-4 rounded">
              Thêm
            </button>
          </div>

          <div className="text-sm">
            <div className="flex justify-between text-green-600">
              <span>🎫 JenkateMW</span>
              <span>-25.000 [Xóa]</span>
            </div>
            <div className="flex justify-between">
              <span>Giao hàng</span>
              <span>Miễn phí</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng phụ</span>
              <span>{subtotal.toLocaleString("vi-VN")}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Tổng</span>
              <span>{subtotal.toLocaleString("vi-VN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
