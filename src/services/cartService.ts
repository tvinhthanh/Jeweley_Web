import api from "@/services/api";
import { CartItem } from "@/lib/types/types";

const AUTH_HEADER = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 1. Lấy giỏ hàng
export const fetchCart = async (): Promise<CartItem[]> => {
  const res = await api.get("/custom/v1/cart", {
    headers: AUTH_HEADER(),
  });
  return res.data;
};

// 2. Thêm vào giỏ
export const addToCart = async (payload: {
  product_id: number;
  quantity: number;
  variation: {
    color?: string;
    size?: string;
  };
  snapshot: {
    slug: string;
    name: string;
    image: string;
    price: number;
  };
}) => {
  const res = await api.post("/custom/v1/cart", payload, {
    headers: AUTH_HEADER(),
  });
  return res.data;
};

// 3. Cập nhật số lượng
export const updateCartItem = async (
  product_id: number,
  variation: { color: string; size: string },
  quantity: number
) => {
  const res = await api.post("/custom/v1/cart/update", {
    product_id,
    variation,
    quantity,
  }, {
    headers: AUTH_HEADER(),
  });
  return res.data;
};



// 4. Xoá sản phẩm
export const deleteCartItem = async (
  product_id: number,
  variation: { color: string; size: string }
) => {
  const res = await api.post("/custom/v1/cart/delete", {
    product_id,
    variation,
  }, {
    headers: AUTH_HEADER(),
  });
  return res.data;
};



// 5. Xoá toàn bộ giỏ
export const clearCart = async () => {
  const res = await api.delete("/custom/v1/cart", {
    headers: AUTH_HEADER(),
  });
  return res.data;
};
