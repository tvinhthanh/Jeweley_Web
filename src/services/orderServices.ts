/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "@/lib/types/types";
import api from "./api";

// Tạo đơn hàng dưới quyền người dùng JWT
export const createOrder = async (orderData: {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: any;
  shipping: any;
  line_items: {
    product_id: number;
    quantity: number;
    variation_id?: number;
  }[];
  coupon_lines?: {
    code: string;
  }[];
  customer_note?: string;
  customer_id: number;
  shipping_lines?: {
    method_id: string;
    method_title: string;
    total: string;       // phí ship (VND dưới dạng string)
    total_tax?: string;  // thuế ship (nếu có)
  }[];
}) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/wc/v3/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// // Lấy danh sách đơn hàng của người dùng
// export const getOrders = async () => {
//   const token = localStorage.getItem("token");

//   const response = await api.get("/wc/v3/orders", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };
// // Lấy chi tiết đơn hàng
// export const getOrderDetails = async (orderId: number) => {
//   const token = localStorage.getItem("token");

//   const response = await api.get(`/wc/v3/orders/${orderId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };
export const fetchMyOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem("token");

  const res = await api.get("/custom/v1/my-orders", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const rawOrders = res.data;

  // Convert items object → array cho mỗi đơn
  const normalizedOrders: Order[] = rawOrders.map((order: any) => ({
    ...order,
    items: Object.values(order.items || {}),
  }));

  return normalizedOrders;
};
export const fetchOrderDetail = async (id: number): Promise<Order> => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/custom/v1/my-orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const raw = res.data;

  return {
    ...raw,
    items: Object.values(raw.items || {}),
  };
};
