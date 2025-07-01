"use client";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export function InfoTab() {
  const { user } = useAppContext();
  const [firstName, setFirstName] = useState(user?.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name.split(" ")[1] || "");
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }
    alert("Lưu thay đổi thành công (giả lập)");
  };

  return (
    <div className="space-y-8 text-gray-800">
      <section>
        <h2 className="text-lg font-semibold mb-4">Chi tiết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">TÊN *</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">HỌ *</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">TÊN HIỂN THỊ *</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full border rounded px-4 py-2" />
            <p className="text-xs text-gray-500 mt-1">Tên hiển thị trong tài khoản và đánh giá.</p>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">EMAIL *</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Mật khẩu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">MẬT KHẨU CŨ</label>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">MẬT KHẨU MỚI</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">XÁC NHẬN MẬT KHẨU MỚI</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>
        </div>
        <button onClick={handleSave} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500">
          Lưu thay đổi
        </button>
      </section>
    </div>
  );
}
