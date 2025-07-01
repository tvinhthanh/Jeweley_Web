"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const defaultTab =
    searchParams.get("tab") === "social" ? "social" : "email";
  const [activeTab, setActiveTab] = useState<"email" | "social">(defaultTab);

  useEffect(() => {
    // Cập nhật lại tab nếu query param thay đổi
    if (searchParams.get("tab") === "social") {
      setActiveTab("social");
    } else {
      setActiveTab("email");
    }
  }, [searchParams]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          className={`pb-2 font-medium ${
            activeTab === "email"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("email")}
        >
          Gửi mail cho chúng tôi
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === "social"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("social")}
        >
          Mạng xã hội
        </button>
      </div>

      {/* Content */}
      {activeTab === "email" ? (
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              placeholder="Bạn cần hỗ trợ gì?"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Gửi liên hệ
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 text-center text-blue-600">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-blue-800"
          >
            <FaFacebookF size={28} />
            <span className="text-sm mt-1">Facebook</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-pink-500"
          >
            <FaInstagram size={28} />
            <span className="text-sm mt-1">Instagram</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-red-600"
          >
            <FaYoutube size={28} />
            <span className="text-sm mt-1">YouTube</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-blue-400"
          >
            <FaTwitter size={28} />
            <span className="text-sm mt-1">Twitter</span>
          </a>
        </div>
      )}
    </div>
  );
}
