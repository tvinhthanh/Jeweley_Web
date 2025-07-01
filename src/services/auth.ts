// services/auth.ts
export const login = async (email: string, password: string) => {
  // Đây là API giả lập. Thay thế bằng real API sau
  if (email === "admin@example.com" && password === "123456@D") {
    return {
      success: true,
      token: "fake-jwt-token-123456",
      user: {
        id: 1,
        name: "Admin",
        email,
      },
    };
  }

  throw new Error("Sai tài khoản hoặc mật khẩu");
};
