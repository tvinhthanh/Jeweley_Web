/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { register as registerService, login as loginService } from "@/services/authService";
import { useAppContext } from "@/context/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedAccept = localStorage.getItem("acceptedTerms");
    if (storedAccept === "true") {
      setAcceptedTerms(true);
    }
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userName.trim()) {
      newErrors.userName = "Vui lòng nhập tên.";
    }

    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(password)) {
      newErrors.password =
        "Mật khẩu cần ít nhất 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc biệt.";
    }

    if (password !== rePassword) {
      newErrors.rePassword = "Mật khẩu nhập lại không khớp.";
    }

    if (!acceptedTerms) {
      newErrors.terms = "Bạn cần chấp nhận điều khoản.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerService(userName, email, password);

      const res = await loginService(email, password);
      login(res.token, res.user);

      alert("Tạo tài khoản và đăng nhập thành công!");
      router.push("/");
    } catch (err: any) {
      setErrors({ api: err?.response?.data?.message || "Đăng ký thất bại" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      <Image src="/images/bglogin.png" alt="Background" fill className="object-cover" />

      <div className="w-full h-[600px] max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-12 flex flex-col justify-center bg-blue-50">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
            Tham Gia Với Chúng Tôi
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaUser /></span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nhập tên"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaEnvelope /></span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ Email"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300"
              />
              <div
                className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300"
              />
              <div
                className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm">
                Tôi đã đọc và đồng ý với{" "}
                <strong className="text-blue-700 underline">Thỏa thuận và điều khoản</strong>
              </span>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
            {errors.api && <p className="text-red-600 text-sm">{errors.api}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-800 text-white w-full py-3 rounded-full font-semibold hover:bg-blue-700"
            >
              Tạo tài khoản
            </button>

            {/* Login link */}
            <p className="text-sm text-center text-gray-700">
              Bạn đã có tài khoản?{" "}
              <a href="/login" className="text-blue-700 font-semibold underline">
                Đăng nhập
              </a>
            </p>
          </form>
        </div>

        {/* Hình bên phải */}
        <div className="relative h-[800px] md:h-auto w-full md:w-[600px]">
          <Image src="/images/register.png" alt="Jewelry Banner" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-xl md:text-2xl font-semibold text-center px-6">
              Giá trị tạo nên khác biệt!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
