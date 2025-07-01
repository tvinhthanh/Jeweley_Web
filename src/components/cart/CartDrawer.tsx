"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import CartContent from "@/components/cart/CartContent"; // sửa đường dẫn nếu cần
import { useRouter } from "next/navigation";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  const handleGoToCart = () => {
    onClose(); // đóng drawer
    router.push("/cart"); // chuyển trang
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Drawer content */}
      <div className="absolute right-0 top-0 w-full sm:w-[500px] h-full bg-white shadow-lg overflow-y-auto transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Giỏ hàng</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <CartContent />
        </div>

        {/* Footer: Nút đi tới trang Cart */}
        <div className="p-4 border-t">
          <button
            onClick={handleGoToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold"
          >
            Xem giỏ hàng chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
