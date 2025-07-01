"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { InfoTab } from "./InfoTab";
import { AddressTab } from "./AddressTab";
import { OrderTab } from "./OrdersTab";
import FavoritesTab from "./FavoritesTab";

export default function ProfilePage() {
  const { user, logout } = useAppContext();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "info";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <InfoTab />;
      case "address":
        return <AddressTab />;
      case "orders":
        return <OrderTab />;
      case "favorites":
        return <FavoritesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="bg-blue-50 rounded-xl p-6 flex flex-col items-center gap-6 md:col-span-1">
        <div className="relative w-24 h-24">
          <Image
            src="/images/user-avatar.png"
            alt="Avatar"
            fill
            className="rounded-full object-cover border border-gray-300"
          />
          <div className="absolute bottom-0 right-0 bg-white border rounded-full p-1 cursor-pointer">
            📸
          </div>
        </div>
        <h2 className="font-semibold text-lg">{user?.name || "Tên Tài Khoản"}</h2>
        <div className="w-full border-t border-gray-300" />
        <nav className="flex flex-col gap-4 w-full text-left">
          {[
            { key: "info", label: "Cá nhân" },
            { key: "address", label: "Địa chỉ" },
            { key: "orders", label: "Đơn hàng" },
            { key: "favorites", label: "Yêu thích" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left px-2 py-1 rounded ${
                activeTab === tab.key ? "text-blue-800 font-medium" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button onClick={logout} className="text-left px-2 py-1 text-red-500">
            Đăng xuất
          </button>
        </nav>
      </aside>

      {/* Nội dung chính theo tab */}
      <main className="md:col-span-3 space-y-8">
        <h1 className="text-2xl font-bold">Tài Khoản</h1>
        {renderContent()}
      </main>
    </div>
  );
}
