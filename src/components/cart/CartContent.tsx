"use client";

import { useState } from "react";
import Image from "next/image";

const initialItems = [
  {
    id: 1,
    name: "Nhẫn Kim cương Vàng Trắng 14K",
    code: "My First Diamond - MFDB52689",
    image: "/images/ring.png",
    price: 19945000,
    quantity: 2,
  },
  // thêm item nếu cần
];

export default function CartContent() {
  const [items] = useState(initialItems);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-4">
          <Image src={item.image} alt={item.name} width={64} height={64} />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.code}</p>
            <p className="text-sm">{item.quantity} x {item.price.toLocaleString("vi-VN")} ₫</p>
          </div>
        </div>
      ))}

      <div className="mt-4 text-right font-semibold text-lg">
        Tổng: {subtotal.toLocaleString("vi-VN")} ₫
      </div>
    </div>
  );
}
