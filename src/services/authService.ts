/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const login = async (identifier: string, password: string) => {
  const response = await api.post("/jwt-auth/v1/token", {
    username: identifier,
    password,
  });

  const { token } = response.data;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Gọi API lấy user hiện tại
  const meRes = await api.get("/wp/v2/users/me");
  const user = meRes.data;

  // Lưu token và ID vào localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", user.id.toString());

  return {
    token,
    user,
  };
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post("/custom/v1/register", {
    username,
    email,
    password,
  });

  return response.data;
};
export const getMe = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/wp/v2/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateMe = async (data: {
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
  first_name?: string;
  last_name?: string;
}) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/custom/v1/update-user", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const token = localStorage.getItem("token");

  if (!token || !token.includes('.')) {
    throw new Error("Token không hợp lệ hoặc người dùng chưa đăng nhập.");
  }

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.post("/custom/v1/upload-avatar", formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const { media_id, avatar_url } = response.data;

  return {
    media_id,
    avatar_url,
  };
};



export const getCustomerAddress = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/custom/v1/customer-address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const updateCustomerAddress = async (
  type: "billing" | "shipping",
  data: any
) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/custom/v1/update-customer-address",
    {
      type,
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
