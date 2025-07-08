/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppContext } from "@/context/AppContext";
import { updateMe, getMe } from "@/services/authService";
import { useState, useEffect } from "react";

export function InfoTab() {
  const { user, updateUser } = useAppContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || user.name?.split(" ")[0] || "");
      setLastName(user.last_name || user.name?.split(" ")[1] || "");
      setDisplayName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);

      await updateMe({
        name: displayName,
        email: email,
        first_name: firstName,
        last_name: lastName,
        ...(newPassword
          ? {
              password: newPassword,
              old_password: oldPassword,
            }
          : {}),
      });

      const updatedUser = await getMe();
      updateUser(updatedUser);

      alert("Cập nhật thành công!");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-gray-600">Đang tải dữ liệu người dùng...</p>;

  return (
    <div className="space-y-8 text-gray-800">
      <section>
        <h2 className="text-lg font-semibold mb-4">Chi tiết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">TÊN *</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">HỌ *</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">TÊN HIỂN THỊ *</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tên hiển thị trong tài khoản và đánh giá.
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">EMAIL *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Mật khẩu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">MẬT KHẨU CŨ</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">MẬT KHẨU MỚI</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">XÁC NHẬN MẬT KHẨU MỚI</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </section>
    </div>
  );
}
