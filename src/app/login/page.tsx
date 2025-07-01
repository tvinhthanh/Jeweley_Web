/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { login as loginService } from "@/services/auth";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Email không hợp lệ.";
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 ? "" : "Mật khẩu phải có ít nhất 8 ký tự.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) return;
    if (!acceptedTerms) return alert("Vui lòng chấp thuận điều khoản.");

    try {
      const res = await loginService(email, password);
      login(res.token, res.user);
      alert("Đăng nhập thành công!");
      router.push('/')
    } catch (err: any) {
      setSubmitError(err.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      <Image src="/images/bglogin.png" alt="Background" fill className="object-cover" />
      <div className="w-full h-[600px] max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Hình bên trái */}
        <div className="relative h-[800px] md:h-auto w-full md:w-[600px]">
          <Image src="/images/login.png" alt="Jewelry Banner" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-xl md:text-2xl font-semibold text-center px-6">
              Giá trị tạo nên khác biệt!
            </h2>
          </div>
        </div>

        {/* Form bên phải */}
        <div className="p-6 md:p-12 flex flex-col justify-center bg-blue-50">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
            Mừng bạn trở lại
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <div
                className={`flex items-center px-4 py-3 rounded-full border ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              >
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  className="flex-1 bg-transparent focus:outline-none"
                />
              </div>
              {emailError && <p className="text-red-600 text-sm ml-2 mt-1">{emailError}</p>}
            </div>

            {/* Password */}
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

            {/* Checkbox */}
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

            {/* Link đăng ký */}
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
