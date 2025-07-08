"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { InfoTab } from "./InfoTab";
import { AddressTab } from "./AddressTab";
import { OrderTab } from "./OrdersTab";
import FavoritesTab from "./FavoritesTab";
import { FaEdit } from "react-icons/fa";
import { getMe, uploadAvatar } from "@/services/authService";

type Props = {
  initialTab: string;
};

export default function ProfilePage({ initialTab }: Props) {
  const router = useRouter();
  const { user, logout, updateUser } = useAppContext();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [avatarUrl, setAvatarUrl] = useState("/images/user-avatar.png");
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  useEffect(() => {
    if (user?.simple_local_avatar?.full) {
      setAvatarUrl(user.simple_local_avatar.full);
    } else if (user?.avatar_urls) {
      setAvatarUrl(
        typeof user.avatar_urls === "string"
          ? user.avatar_urls
          : user.avatar_urls.full || user.avatar_urls[96] || "/images/user-avatar.png"
      );
    } else {
      setAvatarUrl("/images/user-avatar.png");
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoadingAvatar(true);
      await uploadAvatar(file);
      const updatedUser = await getMe();
      updateUser(updatedUser);
    } catch (error) {
      console.error("Upload avatar failed", error);
    } finally {
      setLoadingAvatar(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/profile?tab=${tab}`);
  };

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

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Bạn chưa đăng nhập.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="bg-blue-50 rounded-xl p-6 flex flex-col items-center gap-6 md:col-span-1">
        <div className="relative w-24 h-24">
          <Image
            src={avatarUrl}
            alt="Avatar"
            fill
            onError={() => setAvatarUrl("/images/user-avatar.png")}
            className="rounded-full object-cover border border-gray-300"
          />
          {loadingAvatar && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full">
              <span className="text-xs text-gray-600 animate-pulse">Đang cập nhật...</span>
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-white border rounded-full p-1 cursor-pointer hover:bg-gray-100">
            <FaEdit className="text-sm text-gray-700" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <h2 className="font-semibold text-lg">
          {user?.name?.split(" ")[0] || "Tên Tài Khoản"}
        </h2>

        <div className="w-full border-t border-gray-300" />

        <nav className="flex flex-col gap-4 w-full text-left">
          {[ 
            { key: "info", label: "Cá nhân" },
            { key: "address", label: "Địa chỉ" },
            { key: "orders", label: "Đơn hàng" },
            { key: "favorites", label: "Yêu thích" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`text-left px-2 py-1 rounded transition ${
                activeTab === tab.key
                  ? "bg-blue-100 text-blue-800 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button onClick={handleLogout} className="text-left px-2 py-1 text-red-500">
            Đăng xuất
          </button>
        </nav>
      </aside>

      {/* Nội dung chính */}
      <main className="md:col-span-3 space-y-8">
        <h1 className="text-2xl font-bold">Tài Khoản</h1>
        {renderContent()}
      </main>
    </div>
  );
}
