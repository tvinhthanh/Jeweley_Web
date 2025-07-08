/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { login as loginService } from "@/services/authService";
import { useAppContext } from "@/context/AppContext";

export default function LoginPage() {
  const { login } = useAppContext();
  const router = useRouter();
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateIdentifier = (value: string) => {
    return value.trim().length > 0 ? "" : "Vui lòng nhập email hoặc tên đăng nhập.";
  };

  const validatePassword = (value: string) => {
    return value.length >= 8 ? "" : "Mật khẩu phải có ít nhất 8 ký tự.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const idErr = validateIdentifier(identifier);
    const passErr = validatePassword(password);

    setIdentifierError(idErr);
    setPasswordError(passErr);

    if (idErr || passErr) return;
    if (!acceptedTerms) return alert("Vui lòng chấp thuận điều khoản.");

    try {
      const res = await loginService(identifier, password); // gọi API với identifier
      if (!res || !res.token || !res.user) {
        throw new Error("Phản hồi từ server không hợp lệ.");
      }

      login(res.token, res.user);
      alert("Đăng nhập thành công!");
      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setSubmitError(err.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      <Image src="/images/bglogin.png" alt="Background" fill className="object-cover" />
      <div className="w-full h-[600px] max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Left image */}
        <div className="relative h-[800px] md:h-auto w-full md:w-[600px]">
          <Image src="/images/login.png" alt="Jewelry Banner" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-xl md:text-2xl font-semibold text-center px-6">
              Giá trị tạo nên khác biệt!
            </h2>
          </div>
        </div>

        {/* Right form */}
        <div className="p-6 md:p-12 flex flex-col justify-center bg-blue-50">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
            Mừng bạn trở lại
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Identifier field (username or email) */}
            <div>
              <div
                className={`flex items-center px-4 py-3 rounded-full border ${
                  identifierError ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email hoặc tên đăng nhập"
                  className="flex-1 bg-transparent focus:outline-none"
                />
              </div>
              {identifierError && <p className="text-red-600 text-sm ml-2 mt-1">{identifierError}</p>}
            </div>

            {/* Password field */}
            <div>
              <div
                className={`flex items-center px-4 py-3 rounded-full border relative ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="flex-1 bg-transparent focus:outline-none"
                />
                <div
                  className="absolute right-4 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordError && <p className="text-red-600 text-sm ml-2 mt-1">{passwordError}</p>}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span className="text-sm">
                Tôi đã đọc và đồng ý với{" "}
                <strong className="text-blue-700 underline">Thỏa thuận và điều khoản</strong>
              </span>
            </div>

            {/* Submit error */}
            {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

            {/* Submit button */}
            <button
              type="submit"
              className={`${
                acceptedTerms ? "bg-blue-800 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              } text-white w-full py-3 rounded-full font-semibold`}
              disabled={!acceptedTerms}
            >
              Đăng nhập
            </button>

            {/* Signup link */}
            <p className="text-sm text-center text-gray-700">
              Bạn chưa có tài khoản?{" "}
              <a href="/register" className="text-blue-700 font-semibold underline">
                Đăng ký
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
