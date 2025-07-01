"use client";

import { useRouter } from "next/navigation";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaInfoCircle,
  FaHeadset,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";

const NAV_ITEMS = [
  { label: "TRANG SỨC", path: "/category/trang-suc" },
  { label: "TRANG SỨC CƯỚI", path: "/category/trang-suc-cuoi" },
  { label: "TRANG SỨC KIM CƯƠNG", path: "/category/kim-cuong" },
  { label: "TRANG SỨC NAM", path: "/category/nam" },
  { label: "TRANG SỨC NỮ", path: "/category/nu" },
  { label: "TRANG SỨC THƯƠNG HIỆU", path: "/category/thuong-hieu" },
];

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAppContext();
  const [showCart, setShowCart] = useState(false);

  const goToHome = () => router.push("/");
  const goToLogin = () => router.push("/login");
  const goToProfile = () => router.push("/profile");

  return (
    <header className="w-full text-sm text-gray-700 font-medium">
      {/* Top bar */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">🇻🇳</span> VIETNAM
            </span>
            <span className="flex items-center gap-1">
              <FaInfoCircle className="text-white" /> Thông tin khuyến mãi mới nhất
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="flex items-center gap-1 cursor-pointer hover:text-yellow-300"
              onClick={() => router.push("/contact?tab=social")}
            >
              <FaInfoCircle /> Chúng tôi
            </span>

            <span className="flex items-center gap-1 cursor-pointer hover:text-yellow-300"
                  onClick={() => router.push("/store-locator")}>
              <MdLocationOn/> Cửa hàng
            </span>
            <span className="flex items-center gap-1">
              <FaHeadset /> 1900 8888
            </span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-blue-100">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-4">
          {/* Logo + Partner */}
          <div className="flex items-center gap-6">
            <div className="text-lg font-bold cursor-pointer" onClick={goToHome}>
              <span className="text-blue-600">📍 COMPANY</span>
              <div className="text-xs text-gray-500">Your Logo Here</div>
            </div>
            <button className="border border-blue-500 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition text-sm"
              onClick={() => router.push("/contact?tab=email")}
             >
              Become a Partner
            </button>
          </div>

          {/* Search */}
          <div className="flex-grow max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-lg relative">
            {user ? (
              <div className="relative group cursor-pointer">
                <div
                  className="flex items-center gap-1 hover:text-blue-600"
                  onClick={goToProfile}
                >
                  <FaUser />
                  <span className="text-sm">{user.name}</span>
                </div>
                <div className="absolute top-8 left-0 hidden group-hover:block bg-white border rounded shadow-md px-4 py-2 z-10 text-sm w-48">
                  <p className="text-gray-700 font-semibold">{user.email}</p>
                  <button
                    onClick={logout}
                    className="mt-2 text-red-600 hover:underline"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <FaUser
                className="cursor-pointer hover:text-blue-600"
                title="Tài khoản"
                onClick={goToLogin}
              />
            )}
            <FaHeart
              className="cursor-pointer hover:text-blue-600"
              title="Yêu thích"
              onClick={() => router.push("/profile?tab=favorites")}
            />
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
              onClick={() => setShowCart(true)}
            >
              <FaShoppingCart />
              <span className="text-sm">Cart $0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav menu */}
      <div className="bg-gray-100">
        <nav className="max-w-screen-xl mx-auto px-4 py-2 flex gap-6 justify-center flex-wrap text-xs md:text-sm">
          {NAV_ITEMS.map((item, idx) => (
            <span
              key={idx}
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => router.push(`/category/${item.path.split("/").pop()}`)}
            >
              {item.label}
            </span>
          ))}
        </nav>
      </div>

      {/* ✨ Drawer Cart hiển thị cuối cùng trong DOM */}
      <CartDrawer open={showCart} onClose={() => setShowCart(false)} />
    </header>
  );
}
