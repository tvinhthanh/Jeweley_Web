"use client";

import { useRouter } from "next/navigation";

export function useAppRouter() {
  const router = useRouter();

  const goToLogin = () => router.push("/login");
  const goToHome = () => router.push("/");
  const goToProduct = (slug: string) => router.push(`/product/${slug}`);
  const goToRegister = () => router.push("/register");
  const goToCart = () => router.push("/cart");

  return {
    goToLogin,
    goToHome,
    goToProduct,
    goToRegister,
    goToCart,
    router, // vẫn có thể truy cập thủ công
  };
}
